import { Injectable } from '@nestjs/common';
import { JobApplicationNote } from './entities/job-application-note.entity';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { JobApplicationNoteDto } from './dtos/job-application-note.dto';

@Injectable()
export class JobApplicationNoteMapper {
  toEntity(dto: JobApplicationNoteDto) {
    const entity = new JobApplicationNote();
    entity.content = dto.content;
    entity.order = dto.order;
    const jobApplication = new JobApplication();
    jobApplication.id = dto.id;
    entity.jobApplication = jobApplication;
  }

  toDto(entity: JobApplicationNote) {
    const dto = new JobApplicationNoteDto();
    dto.id = entity.id;
    dto.content = entity.content;
    dto.order = entity.order;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
