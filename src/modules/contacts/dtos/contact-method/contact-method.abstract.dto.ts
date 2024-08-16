import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContactMethodType, ContactMethodTypeEnum } from '../../enums/contact-type.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../../../dtos/base.dto';

export abstract class ContactMethodDto extends BaseDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsEnum(ContactMethodTypeEnum)
  type: ContactMethodType;
}
