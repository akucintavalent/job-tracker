import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateJobApplicationNoteDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  jobApplicationId?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  content: string | null;
}
