import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateJobApplicationNote {
  @ApiProperty()
  @IsString()
  content: string;
}
