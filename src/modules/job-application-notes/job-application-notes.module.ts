import { Module } from '@nestjs/common';
import { JobApplicationNotesService } from './job-application-notes.service';
import { JobApplicationNotesController } from './job-application-notes.controller';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication])],
  providers: [JobApplicationNotesService],
  controllers: [JobApplicationNotesController],
})
export class JobApplicationNotesModule {}
