import { IsString } from 'class-validator';
import { ContactEmailDto } from './contact-email.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactMethodEmailDto extends ContactEmailDto {
  @ApiProperty()
  @IsString()
  id: string;
}
