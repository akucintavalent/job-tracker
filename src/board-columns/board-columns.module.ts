import { Module } from '@nestjs/common';
import { BoardColumnsController } from './board-columns.controller';
import { BoardColumnsService } from './board-columns.service';
import { BoardColumn } from './entities/board-column.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { BoardColumnMapper } from './board-columns.mapper';
import { JobApplicationMapper } from 'src/job-applications/job-applications.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn, Board])],
  controllers: [BoardColumnsController],
  providers: [BoardColumnsService, BoardColumnMapper, JobApplicationMapper],
})
export class BoardColumnsModule {}
