import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { BoardMapper } from './boards.mapper';
import { BoardColumnsModule } from '../board-columns/board-columns.module';
import { BoardsAllController } from './boards-all.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User]), BoardColumnsModule],
  controllers: [BoardsController, BoardsAllController],
  providers: [BoardsService, BoardMapper],
  exports: [BoardsService],
})
export class BoardsModule {}
