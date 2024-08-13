import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactPhoneDto } from './contact-phone.dto';

export class CreateContactMethodPhoneDto extends ContactPhoneDto {
  @ApiProperty()
  @IsString()
  id: string;
}
