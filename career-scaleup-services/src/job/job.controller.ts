import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { JobService } from './job.service.js';
import { Role, Roles } from '../common/decorator/roles.decorator.js';
import {
  CreateJobDto,
  JobDto,
  UpdateJobDto,
  UpdateJobStatus,
} from './dto/job.dto.js';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @Roles(Role.Recruiter, Role.Admin)
  @Post('create')
  async createJob(@Body() body: CreateJobDto, @Req() req) {
    return this.jobService.createJob(req.user.userId, body);
  }

  @Roles(Role.Recruiter, Role.Admin)
  @Patch(':id/update')
  async updateJob(
    @Param('id') id: string,
    @Body() jobDto: UpdateJobDto,
    @Req() req,
  ) {
    const recruiterId = req.user.userId;
    return this.jobService.updateJob(id, recruiterId, { ...jobDto });
  }

  @Roles(Role.Seeker, Role.Admin)
  @Get()
  async getJobs(
    @Query('query') query: string = 'all',
    @Query('country') country: string = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('num_pages', new DefaultValuePipe(1), ParseIntPipe)
    num_pages: number,
    @Query('date_posted') date_posted: string = 'all',
    @Req() req,
  ) {
    return this.jobService.getJobs(
      req.user.userId,
      query,
      country,
      page,
      num_pages,
      date_posted,
    );
  }

  @Roles(Role.Seeker, Role.Admin)
  @Get('saved')
  getSavedJobs(@Req() req) {
    const userId = req.user.userId;
    return this.jobService.getSavedJobs(userId);
  }

  @Get('matched')
  @Roles(Role.Seeker, Role.Admin)
  getMatchedJobs(@Req() req) {
    return this.jobService.getJobs(req.user.userId, 'all', '', 1, 1, 'all');
  }

  @Delete('saved/:id')
  @Roles(Role.Seeker, Role.Admin)
  deleteSavedJob(@Req() req, @Param('id') savedJobId: string) {
    return this.jobService.deleteSavedJob(req.user.userId, savedJobId);
  }

  @Patch('saved/:id/status')
  @Roles(Role.Seeker, Role.Admin)
  updateSavedJobStatus(
    @Req() req,
    @Param('id') savedJobId: string,
    @Body('status') status: string,
  ) {
    return this.jobService.updateSavedJobStatus(
      req.user.userId,
      savedJobId,
      status,
    );
  }

  @Post('match-score')
  @Roles(Role.Seeker, Role.Admin)
  async getMatchScore(@Req() req, @Body('job') job: JobDto) {
    return this.jobService.getMatchScore(req.user.userId, job);
  }

  @Get('postedJobs')
  @Roles(Role.Recruiter, Role.Admin)
  async getPostedJobs(@Req() req) {
    return this.jobService.getPostedJobs(req.user.userId);
  }

  @Get(':id')
  @Roles(Role.Seeker, Role.Admin)
  async getJobById(@Param('id') id: string) {
    return this.jobService.getJobById(id);
  }

  @Post('save')
  @Roles(Role.Seeker, Role.Admin)
  saveJob(
    @Req() req: any,
    @Body('job') job: any,
    @Body('source') source: 'internal' | 'external',
  ) {
    const userId = req.user.userId;
    return this.jobService.saveJob(userId, job, source);
  }

  @Patch('updateStatus')
  @Roles(Role.Recruiter, Role.Admin)
  async updateJobStatus(@Body() body: UpdateJobStatus, @Req() req) {
    return this.jobService.updateJobStatus(
      req.user.userId,
      body.jobId,
      body.status,
    );
  }

  @Delete(':id')
  @Roles(Role.Recruiter, Role.Admin)
  async deleteJob(@Param('id') jobId: string) {
    return this.jobService.deleteJob(jobId);
  }
}
