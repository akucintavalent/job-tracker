import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { JobApplicationNotesService } from './job-application-notes.service';
import { AuthUser } from '../auth/user.decorator';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';
import { CreateJobApplicationNoteDto } from './dtos/create-job-application-note.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobApplicationNoteDto } from './dtos/job-application-note.dto';
import { UpdateJobApplicationNote } from './dtos/update-job-application-note.dto';

@ApiTags('job-application-notes')
@Controller('job-application-notes')
export class JobApplicationNotesController {
  constructor(private readonly jobApplicationNotesService: JobApplicationNotesService) {}

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'JobApplication id' })
  @ApiOperation({ summary: `Fetch all JobApplication's Notes` })
  @ApiResponse({ status: 200, description: 'Note records', type: [JobApplicationNoteDto] })
  @ApiResponse({ status: 400, description: 'Validation error' })
  find(@Param('id', ParseUUIDPipe) jobApplicationId: string, @AuthUser() { userId }: AuthUserDto) {
    return this.jobApplicationNotesService.find(jobApplicationId, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new Note for a JobApplication' })
  @ApiResponse({ status: 200, description: 'Note created', type: JobApplicationNoteDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'JobApplication not found' })
  create(
    @Body() jobApplicationNote: CreateJobApplicationNoteDto,
    @AuthUser() { userId }: AuthUserDto,
  ) {
    return this.jobApplicationNotesService.create(jobApplicationNote, userId);
  }

  @Put('/:id')
  @ApiQuery({ name: 'id', description: 'JobApplicationNote id' })
  @ApiOperation({ summary: `Updates JobApplicationNote` })
  @ApiResponse({ status: 200, description: 'Note updated', type: JobApplicationNoteDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateJobApplicationNote,
    @AuthUser() { userId }: AuthUserDto,
  ) {
    return this.jobApplicationNotesService.update(id, dto, userId);
  }

  @Put('/:id/rearrange')
  @ApiParam({ name: 'jobApplicationId', description: 'JobApplication id' })
  @ApiBody({
    description: 'List all Note IDs for this JobApplication in the desired order',
    type: [String],
  })
  @ApiOperation({ summary: `Rearrange all notes for this JobApplication` })
  @ApiResponse({ status: 200, description: 'Notes rearranged' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async rearrange(
    @Param('id', ParseUUIDPipe) jobApplicationId: string,
    @Body() noteIds: string[],
    @AuthUser() { userId }: AuthUserDto,
  ) {
    await this.jobApplicationNotesService.rearrange(jobApplicationId, noteIds, userId);
  }

  @Delete('/:id')
  @ApiQuery({ name: 'id', description: 'JobApplicationNote id' })
  @ApiOperation({ summary: `Deletes JobApplicationNote` })
  @ApiResponse({ status: 200, description: 'JobApplicationNote deleted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 400, description: 'JobApplicationNote not found' })
  async delete(@Param('id', ParseUUIDPipe) id: string, @AuthUser() { userId }: AuthUserDto) {
    await this.jobApplicationNotesService.delete(id, userId);
  }
}
