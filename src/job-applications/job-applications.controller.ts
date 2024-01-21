import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';

@ApiTags('job-applications')
@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly jobApplicationsService: JobApplicationsService) {}

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Column id' })
  @ApiOperation({ summary: `Fetch all job application from column` })
  @ApiResponse({ status: 200, description: 'Job application records' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  findJobsByColumn(@Param('id', ParseUUIDPipe) columnId: string) {
    return this.jobApplicationsService.findBy(columnId);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new Job Application for Board Column' })
  @ApiResponse({ status: 200, description: 'Job Application created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Board Column not found' })
  create(@Body() dto: CreateJobApplicationDto) {
    return this.jobApplicationsService.create(dto);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', description: 'Job Application id' })
  @ApiOperation({ summary: 'Updates a new Job Application' })
  @ApiResponse({ status: 200, description: 'Job Application updated' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Job Application not found' })
  @ApiResponse({ status: 400, description: 'Board Column not found' })
  update(@Param('id', ParseUUIDPipe) jobId: string, @Body() dto: UpdateJobApplicationDto) {
    return this.jobApplicationsService.update(jobId, dto);
  }
}
