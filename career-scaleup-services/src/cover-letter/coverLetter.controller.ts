import {
  Body,
  Req,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { CoverLetterService } from './coverLetter.service.js';
import { GenerateCoverLetterDTO } from './dto/cover-letter.dto.js';
import { Role, Roles } from '../common/decorator/roles.decorator.js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cover-letter')
export class CoverLetterController {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  @Roles(Role.Seeker, Role.Admin)
  @Get('')
  async getCoverLetters(@Req() req) {
    return this.coverLetterService.getCoverLetters(req.user.userId);
  }

  @Roles(Role.Seeker, Role.Admin)
  @Post('generate')
  async generateCoverLetter(@Body() body: GenerateCoverLetterDTO, @Req() req) {
    return this.coverLetterService.generateCoverLetter(req.user.userId, body);
  }

  @Roles(Role.Seeker, Role.Admin)
  @Post('optimize')
  async optimizeCoverLetter(@Body() body, @Req() req) {
    // console.log(body);
    return this.coverLetterService.optimizeCoverLetter(body.coverLetter, body.job, body.company);
  }

  @Roles(Role.Seeker, Role.Admin)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCoverLetter(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file  Uploaded');

    return this.coverLetterService.uploadCoverLetter(
      file.buffer,
      req.user.userId,
    );
  }
}
