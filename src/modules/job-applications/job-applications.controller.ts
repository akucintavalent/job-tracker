import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';
import { JobApplicationMapper } from './job-applications.mapper';
import { JobApplicationDto } from './dtos/job-application.dto';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';
import { AuthUser } from '../auth/user.decorator';

@ApiTags('job-applications')
@Controller('job-applications')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
    private readonly mapper: JobApplicationMapper,
  ) {}

  @Get('/column/:columnId')
  @ApiParam({ name: 'id', description: 'Column id' })
  @ApiOperation({ summary: `Fetch all job application from column` })
  @ApiResponse({ status: 200, description: 'Job application records', type: [JobApplicationDto] })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async findJobsByColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @AuthUser() user: AuthUserDto,
  ) {
    const entities = await this.jobApplicationsService.findBy(columnId, user.userId);
    return entities.map((e) => this.mapper.toDto(e));
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new Job Application for Board Column' })
  @ApiResponse({ status: 200, description: 'Job Application created', type: JobApplicationDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Board Column not found' })
  async create(@Body() dto: CreateJobApplicationDto, @AuthUser() user: AuthUserDto) {
    const entity = await this.jobApplicationsService.create(dto, user.userId);
    return this.mapper.toDto(entity);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', description: 'Job Application id' })
  @ApiOperation({ summary: 'Updates a new Job Application' })
  @ApiResponse({ status: 200, description: 'Job Application updated', type: JobApplicationDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Job Application not found' })
  @ApiResponse({ status: 400, description: 'Board Column not found' })
  async update(
    @Param('id', ParseUUIDPipe) jobId: string,
    @Body() dto: UpdateJobApplicationDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.jobApplicationsService.update(jobId, dto, user.userId);
    return this.mapper.toDto(entity);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'Job Application id' })
  @ApiOperation({ summary: 'Deletes a new Job Application' })
  @ApiResponse({ status: 200, description: 'Job Application deleted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'Job Application not found' })
  async delete(@Param('id', ParseUUIDPipe) jobId: string, @AuthUser() user: AuthUserDto) {
    await this.jobApplicationsService.delete(jobId, user.userId);
  }
}
