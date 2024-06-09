import { Injectable } from '@nestjs/common';
import { BoardDto } from './dtos/board.dto';
import { Board } from './entities/board.entity';
import { BoardColumnMapper } from 'src/board-columns/board-columns.mapper';

@Injectable()
export class BoardMapper {
  constructor(private readonly columnMapper: BoardColumnMapper) {}
  toDto(entity: Board) {
    const dto = new BoardDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.userId = entity.user?.id;

    dto.columns = !entity.columns ? null : entity.columns.map(this.columnMapper.toDto);
    return dto;
  }
}
