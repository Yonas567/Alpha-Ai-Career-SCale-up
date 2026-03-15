import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateJobDto, ExternalJobDto, JobDto } from './dto/job.dto.js';
import { JobMapper } from './mappers/jobs.mapper.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { JobMatchingService } from './job.matching.service.js';
import { sampleJobs } from './constants.js';
import { UserDTO } from '../dto/user.dto.js';

@Injectable()
export class JobService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jobMatchingService: JobMatchingService,
  ) { }

  private get BASE_URL() {
    return this.configService.get<string>('RAPID_API_JSEARCH_URL')!;
  }

  private get options() {
    return {
      method: 'GET',
      headers: {
        'x-rapidapi-key': this.configService.get<string>('RAPID_API_KEY')!,
        'x-rapidapi-host': this.configService.get<string>('RAPID_API_HOST')!,
      },
    };
  }

  async createJob(userId: string, jobDto: CreateJobDto) {
    const user = (await this.prismaService.users.findUnique({
      where: { id: userId },
    })) as UserDTO;

    const newJob = await this.prismaService.job.create({
      data: {
        recruiterId: userId,
        companyName: user.companyName ?? 'Unknown Company',
        companyLogo: user.logoUrl ?? '',
        companyWebsite: user.website ?? '',

        title: jobDto.title ?? '',
        jobType: jobDto.jobType ?? '',
        workType: jobDto.workType ?? 'Onsite',
        description: jobDto.description ?? '',

        qualifications: jobDto.qualifications ?? [],
        benefits: jobDto.benefits ?? [],
        responsibilities: jobDto.responsibilities ?? [],

        status: jobDto.status ?? 'Open',

        location: jobDto.location ?? '',
        country: jobDto.country ?? '',

        hourlyRate: jobDto.hourlyRate ?? null,
        fixedBudget: jobDto.fixedBudget ?? null,
        salaryMin: jobDto.salaryMin ?? null,
        salaryMax: jobDto.salaryMax ?? null,

        applicationLink: '',
      },
    });

    return newJob;
  }

  async getSavedJobs(userId: string) {
    const savedRecords = await this.prismaService.savedJob.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const savedJobs: any[] = [];

    const internalJobIds = savedRecords
      .filter((record) => record.jobId)
      .map((record) => record.jobId!);

    const internalJobs = internalJobIds.length
      ? await this.prismaService.job.findMany({
        where: { id: { in: internalJobIds } },
      })
      : [];

    for (const record of savedRecords) {
      if (record.jobId) {
        const job = internalJobs.find((j) => j.id === record.jobId);
        if (job) {
          savedJobs.push({
            ...job,
            status: (record as any).status,
          });
        }
      } else if (record.externalJob) {
        const externalJob = record.externalJob;
        let externalObj: any = externalJob;
        if (typeof externalJob === 'string') {
          try {
            externalObj = JSON.parse(externalJob);
          } catch {
            externalObj = externalJob;
          }
        }

        if (externalObj && typeof externalObj === 'object') {
          savedJobs.push({
            ...externalObj,
            status: (record as any).status,
          });
        } else {
          savedJobs.push({
            externalJob: externalObj,
            status: (record as any).status,
          });
        }
      }
    }

    savedJobs.sort(
      (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
    );

    return savedJobs;
  }

  async saveJob(
    userId: string,
    job: ExternalJobDto,
    source: 'internal' | 'external',
  ) {
    if (source === 'internal') {
      const existing = await this.prismaService.savedJob.findFirst({
        where: { userId, jobId: job.id },
      });

      if (existing) {
        return { message: 'Job already saved', alreadyExists: true };
      }

      return this.prismaService.savedJob.create({
        data: {
          userId,
          jobId: job.id,
          createdAt: new Date(job.postedAt),
        },
      });
    } else {
      const existing = await this.prismaService.savedJob.findFirst({
        where: {
          userId,
          externalJob: {
            path: ['id'],
            equals: job.id,
          } as any,
        },
      });

      if (existing) {
        return { message: 'Job already saved', alreadyExists: true };
      }

      return this.prismaService.savedJob.create({
        data: {
          userId,
          externalJob: job,
          createdAt: new Date(job.postedAt),
        },
      });
    }
  }

  async updateJob(
    jobId: string,
    recruiterId: string,
    jobDto: Omit<JobDto, 'id'>,
  ): Promise<JobDto> {
    return await this.prismaService.job.update({
      where: { id: jobId, recruiterId },
      data: jobDto,
    });
  }

  async getJobs(
    userId: string,
    query: string,
    country: string,
    page: number,
    num_pages: number,
    date_posted: string,
  ) {
    const url = new URL(`${this.BASE_URL}/search`);
    url.searchParams.append('query', query);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('num_pages', num_pages.toString());
    url.searchParams.append('country', country);
    url.searchParams.append('date_posted', date_posted);

    const response = await fetch(url, this.options);

    const data = await response.json();

    const jobs: JobDto[] = (data.data || []).map((job: any) =>
      JobMapper.fromAPIResponse(job),
    );

    // I will remove this on prod
    const demoJobs: Omit<JobDto, 'recruiterId'>[] = sampleJobs.map((job) => ({
      ...job,
      source: 'external',
      easyApplied: false,
    }));

    const profile = await this.prismaService.users.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      return {
        page,
        num_pages,
        totalJobs: 0,
        jobs: [],
      };
    }
    const internalJobs = await this.prismaService.job.findMany();

    const annotatedJobs = internalJobs.map((job) => ({
      ...job,
      source: 'internal',
      easyapplied: true,
    }));

    const matchedJobs = this.jobMatchingService.getMatchedJobs(
      profile,
      jobs.length > 0 ? jobs : [...annotatedJobs, ...demoJobs],
    );

    matchedJobs.jobs.sort(
      (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
    );

    return {
      page,
      num_pages,
      totalJobs: matchedJobs.totalJobs,
      jobs: matchedJobs.jobs,
    };
  }

  async getJobById(id: string) {
    const url = new URL(`${this.BASE_URL}/job-details`);
    url.searchParams.append('job_id', id);

    const response = await fetch(url, this.options);
    const job = await response.json();
    return JobMapper.fromAPIResponse(job.data[0]);
  }

  async getPostedJobs(recruiterId: string) {
    return this.prismaService.job.findMany({
      where: { recruiterId },
      include: {
        applications: {
          include: {
            seeker: true,
          },
        },
      },
    });
  }

  async getMatchScore(userId: string, job: ExternalJobDto) {
    const profile = await this.prismaService.users.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      throw new NotFoundException('User profile not found');
    }

    return this.jobMatchingService.getMatchScore(profile as any, job);
  }

  async updateJobStatus(
    recruiterId: string,
    jobId: string,
    status: 'Open' | 'Closed',
  ) {
    return this.prismaService.job.update({
      where: { id: jobId, recruiterId },
      data: {
        status,
      },
    });
  }

  async deleteJob(jobId: string) {
    return this.prismaService.job.delete({ where: { id: jobId } });
  }

  async deleteSavedJob(userId: string, jobId: string) {
    // Try deleting by internal jobId first
    let result = await this.prismaService.savedJob.deleteMany({
      where: { userId, jobId },
    });

    if (result.count > 0) {
      return { message: 'Saved job removed' };
    }

    // Try deleting by externalJob.id
    const externalRecord = await this.prismaService.savedJob.findFirst({
      where: {
        userId,
        externalJob: {
          path: ['id'],
          equals: jobId,
        } as any,
      },
    });

    if (externalRecord) {
      await this.prismaService.savedJob.delete({
        where: { id: externalRecord.id },
      });
      return { message: 'Saved job removed' };
    }

    // Fallback: try by SavedJob record id
    result = await this.prismaService.savedJob.deleteMany({
      where: { id: jobId, userId },
    });

    if (result.count === 0) {
      throw new NotFoundException('Saved job not found');
    }

    return { message: 'Saved job removed' };
  }

  async updateSavedJobStatus(userId: string, jobId: string, status: string) {
    const allowed = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];
    if (!allowed.includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    let result = await this.prismaService.savedJob.updateMany({
      where: { userId, jobId },
      data: { status } as any,
    });

    if (result.count > 0) {
      return { message: 'Saved job status updated', status };
    }

    const externalRecord = await this.prismaService.savedJob.findFirst({
      where: {
        userId,
        externalJob: {
          path: ['id'],
          equals: jobId,
        } as any,
      },
    });

    if (externalRecord) {
      await this.prismaService.savedJob.update({
        where: { id: externalRecord.id },
        data: { status } as any,
      });
      return { message: 'Saved job status updated', status };
    }

    result = await this.prismaService.savedJob.updateMany({
      where: { id: jobId, userId },
      data: { status } as any,
    });

    if (result.count === 0) {
      throw new NotFoundException('Saved job not found');
    }

    return { message: 'Saved job status updated', status };
  }
}
