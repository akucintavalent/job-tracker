import { Injectable } from '@nestjs/common';
import { JobApplicationNote } from './entities/job-application-note.entity';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { JobApplicationNoteDto } from './dtos/job-application-note.dto';
import { IMapper } from '../../mappers/mapper.interface';

@Injectable()
export class JobApplicationNoteMapper
  implements IMapper<JobApplicationNoteDto, JobApplicationNote>
{
  toEntity(dto: JobApplicationNoteDto): JobApplicationNote {
    const entity = new JobApplicationNote();
    entity.content = dto.content;
    entity.order = dto.order;
    const jobApplication = new JobApplication();
    jobApplication.id = dto.id;
    entity.jobApplication = jobApplication;
    return entity;
  }

  toDto(entity: JobApplicationNote): JobApplicationNoteDto {
    const dto = new JobApplicationNoteDto();
    dto.id = entity.id;
    dto.content = entity.content;
    dto.order = entity.order;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
