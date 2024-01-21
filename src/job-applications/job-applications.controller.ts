import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';
import { JobApplicationMapper } from './job-applications.mapper';
import { JobApplicationDto } from './dtos/job-application.dto';

@ApiTags('job-applications')
@Controller('job-applications')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
    private readonly mapper: JobApplicationMapper,
  ) {}

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Column id' })
  @ApiOperation({ summary: `Fetch all job application from column` })
  @ApiResponse({ status: 200, description: 'Job application records', type: [JobApplicationDto] })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async findJobsByColumn(@Param('id', ParseUUIDPipe) columnId: string) {
    const entities = await this.jobApplicationsService.findBy(columnId);
    return entities.map((e) => this.mapper.toDto(e));
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new Job Application for Board Column' })
  @ApiResponse({ status: 200, description: 'Job Application created', type: JobApplicationDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Board Column not found' })
  async create(@Body() dto: CreateJobApplicationDto) {
    const entity = await this.jobApplicationsService.create(dto);
    return this.mapper.toDto(entity);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', description: 'Job Application id' })
  @ApiOperation({ summary: 'Updates a new Job Application' })
  @ApiResponse({ status: 200, description: 'Job Application updated', type: JobApplicationDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Job Application not found' })
  @ApiResponse({ status: 400, description: 'Board Column not found' })
  async update(@Param('id', ParseUUIDPipe) jobId: string, @Body() dto: UpdateJobApplicationDto) {
    const entity = await this.jobApplicationsService.update(jobId, dto);
    return this.mapper.toDto(entity);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'Job Application id' })
  @ApiOperation({ summary: 'Deletes a new Job Application' })
  @ApiResponse({ status: 200, description: 'Job Application deleted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Job Application not found' })
  async delete(@Param('id', ParseUUIDPipe) jobId: string) {
    await this.jobApplicationsService.delete(jobId);
  }
}
