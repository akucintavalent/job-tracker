import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateJobApplicationNoteDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  jobApplicationId: string;

  @ApiProperty()
  @IsString()
  content: string;
}
