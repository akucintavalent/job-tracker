import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateJobApplicationNote {
  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  content: string | null;
}
