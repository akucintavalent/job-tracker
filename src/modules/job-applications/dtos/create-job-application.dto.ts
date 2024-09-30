import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateJobApplicationDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  columnId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  postUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  salary?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  deadline?: string;
}
