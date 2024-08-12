import { IsString } from 'class-validator';
import { ContactMethodEmailDto } from './contact-method-email.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactEmailDto extends ContactMethodEmailDto {
  @ApiProperty()
  @IsString()
  contactId: string;
}
