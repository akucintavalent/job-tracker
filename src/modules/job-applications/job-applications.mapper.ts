import { Injectable } from '@nestjs/common';
import { JobApplication } from './entities/job-application.entity';
import { JobApplicationDto } from './dtos/job-application.dto';
import { JobApplicationNoteMapper } from '../job-application-notes/job-application-notes.mapper';

@Injectable()
export class JobApplicationMapper {
  toDto(entity: JobApplication) {
    const noteMapper = new JobApplicationNoteMapper();
    const dto = new JobApplicationDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.columnId = entity.column?.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.notes = entity.notes?.map(noteMapper.toDto);
    return dto;
  }
}
