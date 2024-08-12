import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactPhoneDto } from './contact-method-phone.dto';

export class CreateContactPhoneDto extends ContactPhoneDto {
  @ApiProperty()
  @IsString()
  id: string;
}
