import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateJobApplicationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  companyName?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  @IsOptional()
  columnId?: string;
}
