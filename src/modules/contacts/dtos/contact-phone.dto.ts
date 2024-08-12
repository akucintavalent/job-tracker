import { ApiProperty } from '@nestjs/swagger';
import { ContactMethodDto } from './contact-method.abstract.dto';
import { IsString } from 'class-validator';

export class ContactPhoneDto extends ContactMethodDto {
  @ApiProperty()
  @IsString()
  phone: string;
}
