import { Injectable } from '@nestjs/common';
import { ContactMethodPhoneDto } from '../dtos/contact-method/contact-method-phone.dto';
import { ContactPhone } from '../entities/contact-phones.entity';

@Injectable()
export class ContactPhoneMapper {
  toDto(entity: ContactPhone): ContactMethodPhoneDto {
    const dto = new ContactMethodPhoneDto();
    dto.id = entity.id;
    dto.phone = entity.phone;
    dto.type = entity.type;
    return dto;
  }

  toEntity(dto: ContactMethodPhoneDto): ContactPhone {
    const entity = new ContactPhone();
    entity.phone = dto.phone;
    entity.type = dto.type;
    return entity;
  }
}
