import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

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

  @ApiProperty({ nullable: true })
  @IsUUID()
  @IsOptional()
  jobApplicationId?: string;
}
