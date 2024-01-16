import { Module } from '@nestjs/common';
import { BoardColumnsController } from './board-columns.controller';
import { BoardColumnsService } from './board-columns.service';
import { BoardColumn } from './entities/board-column.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn, Board])],
  controllers: [BoardColumnsController],
  providers: [BoardColumnsService],
})
export class BoardColumnsModule {}
