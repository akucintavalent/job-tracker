import { Injectable } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { ContactDto } from './dtos/contact.dto';

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
    dto.comment = entity.comment;
    dto.boardId = entity.board?.id;
    dto.jobApplicationIds = entity.jobApplications?.map((x) => x.id);
    return dto;
  }
}
