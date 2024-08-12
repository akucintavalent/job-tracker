import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContactMethodType, ContactMethodTypeEnum } from '../enums/contact-type.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export abstract class ContactMethodDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsEnum(ContactMethodTypeEnum)
  type: ContactMethodType;
}
