import { Body, Controller, Get, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { JobApplicationNotesService } from './job-application-notes.service';
import { AuthUser } from '../auth/user.decorator';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';
import { CreateJobApplicationNoteDto } from './dtos/create-job-application-note.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('job-application-notes')
@Controller('job-application-notes')
export class JobApplicationNotesController {
  constructor(private readonly jobApplicationNotesService: JobApplicationNotesService) {}

  @Get()
  find(
    @Query('jobApplicationId', ParseUUIDPipe) jobApplicationId: string,
    @AuthUser() user: AuthUserDto,
  ) {
    return this.jobApplicationNotesService.find(jobApplicationId, user.userId);
  }

  @Post()
  create(@Body() jobApplicationNote: CreateJobApplicationNoteDto, @AuthUser() user: AuthUserDto) {
    return this.jobApplicationNotesService.create(jobApplicationNote, user.userId);
  }

  @Put('/rearrange')
  @ApiQuery({ name: 'jobApplicationId', description: 'JobApplication id' })
  @ApiBody({
    description: 'List all Note IDs for this JobApplication in the desired order',
    type: [String],
  })
  @ApiOperation({ summary: `Rearrange all notes for this JobApplication` })
  @ApiResponse({ status: 200, description: 'Notes rearranged' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async rearrange(
    @Query('jobApplicationId', ParseUUIDPipe) jobApplicationId: string,
    @Body() noteIds: string[],
    @AuthUser() { userId }: AuthUserDto,
  ) {
    await this.jobApplicationNotesService.rearrange(jobApplicationId, noteIds, userId);
  }
}
