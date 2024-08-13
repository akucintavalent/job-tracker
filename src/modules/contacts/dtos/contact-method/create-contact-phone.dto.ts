import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactPhoneDto } from './contact-phone.dto';

export class CreateContactPhoneDto extends ContactPhoneDto {
  @ApiProperty()
  @IsString()
  contactId: string;
}
