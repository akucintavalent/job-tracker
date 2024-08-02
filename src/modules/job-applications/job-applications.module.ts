import { Module } from '@nestjs/common';
import { JobApplicationsController } from './job-applications.controller';
import { JobApplicationsService } from './job-applications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './entities/job-application.entity';
import { BoardColumn } from '../board-columns/entities/board-column.entity';
import { JobApplicationMapper } from './job-applications.mapper';
import { Board } from '../boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, BoardColumn, Board])],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService, JobApplicationMapper],
})
export class JobApplicationsModule {}
