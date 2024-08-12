import { Injectable } from '@nestjs/common';
import { ContactMethodEmailDto } from '../dtos/contact-method/contact-method-email.dto';
import { ContactEmail } from '../entities/contact-emails.entity';

@Injectable()
export class ContactEmailMapper {
  toDto(entity: ContactEmail): ContactMethodEmailDto {
    const dto = new ContactMethodEmailDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.type = entity.type;
    return dto;
  }

  toEntity(dto: ContactMethodEmailDto): ContactEmail {
    const entity = new ContactEmail();
    entity.email = dto.email;
    entity.type = dto.type;
    return entity;
  }
}
