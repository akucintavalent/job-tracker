import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ContactMethodType, ContactMethodTypeEnum } from '../enums/contact-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactPhoneDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsEnum(ContactMethodTypeEnum)
  type: ContactMethodType;
}
