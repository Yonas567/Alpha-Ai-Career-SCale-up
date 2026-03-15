import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CoverLetterDTO,
  CreateCoverLetterDTO,
  GenerateCoverLetterDTO,
  GeneratedCoverLetterDto,
} from './dto/cover-letter.dto.js';
import { PDFParse } from 'pdf-parse';
import { JobDto } from 'src/job/dto/job.dto.js';

@Injectable()
export class CoverLetterService {
  private readonly baseMicroServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {
    this.baseMicroServiceUrl = process.env.BASE_MICROSERVICE_URL!;
  }

  async getCoverLetters(userId: string) {
    return await this.prismaService.cover_Letter.findMany({
      where: { seekerId: userId },
    });
  }

  async generateCoverLetter(userId: string, body: GenerateCoverLetterDTO) {
    const { mode, payload } = body;
    const { resume, job, jobDescription, jobTitle, company } = payload;

    const requestPayload =
      mode === 'mode-1'
        ? { resume, job, company: 'test' }
        : { resume, jobDescription, jobTitle, company };

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.baseMicroServiceUrl}/api/v1/cover-letter/generate/`, {
          mode,
          payload: { ...requestPayload },
        })
        .pipe(map((response) => response.data as GeneratedCoverLetterDto)),
    );

    const coverLetter = response.cover_letter;

    const createdCoverLetter = await this.saveCoverLetter({
      title: `${coverLetter.employer.position_title}: ${coverLetter.employer.company_name} Cover Letter`,
      seekerId: userId,
      ...coverLetter,
    });

    return createdCoverLetter;
  }

  async saveCoverLetter(coverLetter: CreateCoverLetterDTO) {
    return await this.prismaService.cover_Letter.create({ data: coverLetter });
  }

  async parsePdf(fileBuffer: Buffer) {
    const pdf = new PDFParse({ data: fileBuffer });
    const result = await pdf.getText();
    return result.text;
  }

  async uploadCoverLetter(fileBuffer: Buffer, userId: string) {
    const parsedText = await this.parsePdf(fileBuffer);

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.baseMicroServiceUrl}/api/v1/cover-letter/parse/`, {
          cover_letter_text: parsedText,
        })
        .pipe(map((response) => response.data)),
    );

    return response;
  }

  async optimizeCoverLetter(
    coverLetter: Partial<CoverLetterDTO>,
    job: JobDto,
    company: string,
  ) {
    const response = await firstValueFrom(
      this.httpService
        .post(`${this.baseMicroServiceUrl}/api/v1/cover-letter/optimize/`, {
          cover_letter: coverLetter.letter?.content,
          job,
          company,
        })
        .pipe(map((response) => response.data)),
    );

    const optimizedNewCoverLetter = {
      ...coverLetter,
      letter: {
        ...coverLetter.letter,
        content: response.optimized_cover_letter.optimized_content,
      },
    };

    console.log(optimizedNewCoverLetter);

    return optimizedNewCoverLetter;
  }
}
