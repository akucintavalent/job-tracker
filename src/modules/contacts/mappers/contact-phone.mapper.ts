import { Injectable } from '@nestjs/common';
import { ContactPhoneDto } from '../dtos/contact-method/contact-phone.dto';
import { ContactPhone } from '../entities/contact-phones.entity';

@Injectable()
export class ContactPhoneMapper {
  toDto(entity: ContactPhone): ContactPhoneDto {
    const dto = new ContactPhoneDto();
    dto.id = entity.id;
    dto.phone = entity.phone;
    dto.type = entity.type;
    return dto;
  }

  toEntity(dto: ContactPhoneDto): ContactPhone {
    const entity = new ContactPhone();
    entity.phone = dto.phone;
    entity.type = dto.type;
    return entity;
  }
}
