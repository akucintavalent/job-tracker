import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { BoardMapper } from './boards.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TypeOrmModule.forFeature([User])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardMapper],
})
export class BoardsModule {}
