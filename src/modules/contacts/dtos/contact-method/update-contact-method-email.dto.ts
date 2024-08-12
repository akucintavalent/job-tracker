import { IsString } from 'class-validator';
import { ContactMethodEmailDto } from './contact-method-email.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactMethodEmailDto extends ContactMethodEmailDto {
  @ApiProperty()
  @IsString()
  id: string;
}
