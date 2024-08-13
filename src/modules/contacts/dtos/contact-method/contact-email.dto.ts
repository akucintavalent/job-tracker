import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactMethodDto } from './contact-method.abstract.dto';

export class ContactEmailDto extends ContactMethodDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
