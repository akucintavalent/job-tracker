import { Injectable } from '@nestjs/common';
import { JobApplication } from './entities/job-application.entity';
import { JobApplicationDto } from './dtos/job-application.dto';

@Injectable()
export class JobApplicationMapper {
  toDto(entity: JobApplication) {
    const dto = new JobApplicationDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.companyName = entity.companyName;
    dto.description = entity.description;
    dto.columnId = entity.column?.id;
    return dto;
  }
}
