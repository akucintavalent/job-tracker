import { Injectable } from '@nestjs/common';
import { BoardDto } from './dtos/board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardMapper {
  toDto(entity: Board) {
    const dto = new BoardDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.userId = entity.user?.id;
    return dto;
  }
}
