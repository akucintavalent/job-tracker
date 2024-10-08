import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateJobApplicationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  @IsOptional()
  columnId?: string;

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
