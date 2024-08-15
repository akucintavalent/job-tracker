import { Injectable } from '@nestjs/common';
import { Contact } from '../entities/contact.entity';
import { ContactDto } from '../dtos/contact.dto';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { Board } from '../../boards/entities/board.entity';
import { BoardMapper } from '../../boards/boards.mapper';
import { JobApplicationMapper } from '../../job-applications/job-applications.mapper';
import { ContactEmailMapper } from './contact-email.mapper';
import { ContactPhoneMapper } from './contact-phone.mapper';

@Injectable()
export class ContactMapper {
  toDto(entity: Contact) {
    // TODO: Replace these initialization with proper DI.
    // For some reason I cannot Inject these mappers here
    const jobApplicationMapper = new JobApplicationMapper();
    const boardMapper = new BoardMapper();
    const contactMethodEmailMapper = new ContactEmailMapper();
    const contactMethodPhoneMapper = new ContactPhoneMapper();

    const dto = new ContactDto();
    dto.id = entity.id;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.jobTitle = entity.jobTitle;
    dto.companyName = entity.companyName;
    dto.companyLocation = entity.companyLocation;
    dto.twitterUrl = entity.twitterUrl;
    dto.facebookUrl = entity.facebookUrl;
    dto.linkedinUrl = entity.linkedinUrl;
    dto.githubUrl = entity.githubUrl;
    dto.comment = entity.comment;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.board = boardMapper.toDto(entity.board);
    dto.jobApplications = entity.jobApplications?.map(jobApplicationMapper.toDto);
    dto.emails = entity.contactEmails?.map(contactMethodEmailMapper.toDto);
    dto.phones = entity.contactPhones?.map(contactMethodPhoneMapper.toDto);
    return dto;
  }

  toEntity(dto: CreateContactDto) {
    const entity = new Contact();
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.jobTitle = dto.jobTitle;
    entity.companyName = dto.companyName;
    entity.companyLocation = dto.companyLocation;
    entity.twitterUrl = dto.twitterUrl;
    entity.facebookUrl = dto.facebookUrl;
    entity.linkedinUrl = dto.linkedinUrl;
    entity.githubUrl = dto.githubUrl;
    entity.comment = dto.comment;
    const board = new Board();
    board.id = dto.boardId;
    entity.board = board;
    return entity;
  }
}
