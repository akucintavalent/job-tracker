import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactMethodPhoneDto } from './contact-method-phone.dto';

export class CreateContactPhoneDto extends ContactMethodPhoneDto {
  @ApiProperty()
  @IsString()
  contactId: string;
}
