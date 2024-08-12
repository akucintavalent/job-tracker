import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactMethodPhoneDto } from './contact-method-phone.dto';

export class CreateContactMethodPhoneDto extends ContactMethodPhoneDto {
  @ApiProperty()
  @IsString()
  id: string;
}
