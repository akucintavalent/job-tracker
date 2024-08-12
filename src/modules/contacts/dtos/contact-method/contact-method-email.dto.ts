import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactMethodDto } from './contact-method.abstract.dto';

export class ContactMethodEmailDto extends ContactMethodDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
