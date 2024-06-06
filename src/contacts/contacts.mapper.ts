import { Injectable } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { ContactDto } from './dtos/contact.dto';
import { CreateContactDto } from './dtos/create-contact.dto';
import { Board } from 'src/boards/entities/board.entity';

@Injectable()
export class ContactMapper {
  toDto(entity: Contact) {
    const dto = new ContactDto();
    dto.id = entity.id;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.jobTitle = entity.jobTitle;
    dto.companyName = entity.companyName;
    dto.companyLocation = entity.companyLocation;
    dto.twiterUrl = entity.twiterUrl;
    dto.facebookUrl = entity.facebookUrl;
    dto.linkedinUrl = entity.linkedinUrl;
    dto.githubUrl = entity.githubUrl;
    dto.comment = entity.comment;
    dto.boardId = entity.board?.id;
    dto.jobApplicationIds = entity.jobApplications?.map((x) => x.id);
    return dto;
  }

  toEntity(dto: CreateContactDto) {
    const entity = new Contact();
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.jobTitle = dto.jobTitle;
    entity.companyName = dto.companyName;
    entity.companyLocation = dto.companyLocation;
    entity.twiterUrl = dto.twiterUrl;
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
