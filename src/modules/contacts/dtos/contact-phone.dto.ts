import { IsEnum, IsString } from 'class-validator';
import { ContactMethodType, ContactMethodTypeEnum } from '../enums/contact-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ContactPhoneDto {
  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsEnum(ContactMethodTypeEnum)
  type: ContactMethodType;
}
