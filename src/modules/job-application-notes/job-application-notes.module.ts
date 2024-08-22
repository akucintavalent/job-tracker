import { Module } from '@nestjs/common';
import { JobApplicationNotesService } from './job-application-notes.service';
import { JobApplicationNotesController } from './job-application-notes.controller';

@Module({
  providers: [JobApplicationNotesService],
  controllers: [JobApplicationNotesController],
})
export class JobApplicationNotesModule {}
