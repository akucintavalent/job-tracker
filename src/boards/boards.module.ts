import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { BoardMapper } from './boards.mapper';
import { BoardColumnsModule } from 'src/board-columns/board-columns.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User]), BoardColumnsModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardMapper],
  exports: [BoardsService],
})
export class BoardsModule {}
