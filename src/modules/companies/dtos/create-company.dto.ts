import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsUUID()
  @IsOptional()
  jobApplicationId?: string;
}
