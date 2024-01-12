import { IsString, IsEmail, IsUUID, IsOptional, IsEnum } from 'class-validator';

export class FindUsersDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(['user', 'admin'])
  role?: 'user' | 'admin';
}
