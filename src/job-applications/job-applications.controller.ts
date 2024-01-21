import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
