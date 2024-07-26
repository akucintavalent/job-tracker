import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateContactDto } from './create-contact.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContact extends CreateContactDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
