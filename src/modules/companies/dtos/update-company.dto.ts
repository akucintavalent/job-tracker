import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  industry?: string;
}
