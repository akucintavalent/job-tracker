import { IsString } from 'class-validator';
import { ContactEmailDto } from './contact-method-email.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactEmailDto extends ContactEmailDto {
  @ApiProperty()
  @IsString()
  contactId: string;
}
