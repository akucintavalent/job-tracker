import { Injectable } from '@nestjs/common';
import { BoardDto } from './dtos/board.dto';
import { Board } from './entities/board.entity';
import { BoardColumnMapper } from '../board-columns/board-columns.mapper';

@Injectable()
export class BoardMapper {
  toDto(entity: Board) {
    const columnMapper = new BoardColumnMapper();

    const dto = new BoardDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.isArchived = entity.isArchived;
    dto.userId = entity.user?.id;

    dto.columns = !entity.columns ? null : entity.columns.map(columnMapper.toDto);
    return dto;
  }
}
