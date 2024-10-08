import { Module } from '@nestjs/common';
import { JobApplicationNotesService } from './job-application-notes.service';
import { JobApplicationNotesController } from './job-application-notes.controller';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationNote } from './entities/job-application-note.entity';
import { JobApplicationNoteMapper } from './job-application-notes.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, JobApplicationNote])],
  providers: [JobApplicationNotesService, JobApplicationNoteMapper],
  controllers: [JobApplicationNotesController],
  exports: [JobApplicationNotesService],
})
export class JobApplicationNotesModule {}
