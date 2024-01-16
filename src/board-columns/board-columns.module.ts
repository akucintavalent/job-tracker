import { Module } from '@nestjs/common';
import { BoardColumnsController } from './board-columns.controller';
import { BoardColumnsService } from './board-columns.service';

@Module({
  controllers: [BoardColumnsController],
  providers: [BoardColumnsService]
})
export class BoardColumnsModule {}
