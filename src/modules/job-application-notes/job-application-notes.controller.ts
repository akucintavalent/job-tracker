import { Body, Controller, Get, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { JobApplicationNotesService } from './job-application-notes.service';
import { AuthUser } from '../auth/user.decorator';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';
import { CreateJobApplicationNoteDto } from './dtos/create-job-application-note.dto';

@Controller('job-application-notes')
export class JobApplicationNotesController {
  constructor(private readonly jobApplicationsService: JobApplicationNotesService) {}

  @Get()
  find(
    @Query('jobApplicationId', ParseUUIDPipe) jobApplicationId: string,
    @AuthUser() user: AuthUserDto,
  ) {
    return this.jobApplicationsService.find(jobApplicationId, user.userId);
  }

  @Post()
  create(@Body() jobApplicationNote: CreateJobApplicationNoteDto, @AuthUser() user: AuthUserDto) {
    return this.jobApplicationsService.create(jobApplicationNote, user.userId);
  }
}
