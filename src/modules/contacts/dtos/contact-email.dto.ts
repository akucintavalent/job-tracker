import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ContactMethodType, ContactMethodTypeEnum } from '../enums/contact-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactEmailDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(ContactMethodTypeEnum)
  type: ContactMethodType;
}
