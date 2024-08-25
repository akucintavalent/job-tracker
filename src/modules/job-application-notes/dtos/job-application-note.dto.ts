import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '../../../dtos/base.dto';

export class JobApplicationNoteDto extends BaseDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  jobApplicationId: string;

  @ApiProperty({ nullable: true })
  @IsString()
  content: string | null;

  @ApiProperty()
  @IsNumber()
  order: number;
}
