import { IsEmail, IsEnum } from 'class-validator';
import { ContactMethodType, ContactMethodTypeEnum } from '../enums/contact-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ContactEmailDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(ContactMethodTypeEnum)
  type: ContactMethodType;
}
