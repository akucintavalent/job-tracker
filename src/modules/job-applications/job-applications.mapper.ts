import { Injectable } from '@nestjs/common';
import { JobApplication } from './entities/job-application.entity';
import { JobApplicationDto } from './dtos/job-application.dto';
import { JobApplicationNoteMapper } from '../job-application-notes/job-application-notes.mapper';
import { ContactMapper } from '../contacts/mappers/contacts.mapper';
import { CompanyMapper } from '../companies/companies.mapper';

@Injectable()
export class JobApplicationMapper {
  toDto(entity: JobApplication) {
    const noteMapper = new JobApplicationNoteMapper();
    const contactMapper = new ContactMapper();
    const companyMapper = new CompanyMapper();
    const dto = new JobApplicationDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.postUrl = entity.postUrl;
    dto.salary = entity.salary;
    dto.location = entity.location;
    dto.color = entity.color;
    dto.deadline = entity.deadline;
    dto.columnId = entity.column?.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.notes = entity.notes?.map(noteMapper.toDto);
    dto.contacts = entity.contacts?.map(contactMapper.toDto);
    dto.company = entity.company ? companyMapper.toDto(entity.company) : null;
    return dto;
  }
}
