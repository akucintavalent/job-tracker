import { Injectable } from '@nestjs/common';
import { ContactEmailDto } from '../dtos/contact-method/contact-email.dto';
import { ContactEmail } from '../entities/contact-emails.entity';

@Injectable()
export class ContactEmailMapper {
  toDto(entity: ContactEmail): ContactEmailDto {
    const dto = new ContactEmailDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.type = entity.type;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  toEntity(dto: ContactEmailDto): ContactEmail {
    const entity = new ContactEmail();
    entity.email = dto.email;
    entity.type = dto.type;
    return entity;
  }
}
