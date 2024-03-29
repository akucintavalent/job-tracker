import { Injectable } from '@nestjs/common';
import { BoardColumn } from './entities/board-column.entity';
import { BoardColumnDto } from './dtos/board-column.dto';
import { JobApplicationMapper } from 'src/job-applications/job-applications.mapper';

@Injectable()
export class BoardColumnMapper {
  constructor(private readonly jobMapper: JobApplicationMapper) {}

  toDto(entity: BoardColumn) {
    const dto = new BoardColumnDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.order = entity.order;
    dto.boardId = entity.board?.id;
    dto.jobApplications = entity.jobApplications?.map((e) => this.jobMapper.toDto(e));
    return dto;
  }
}
