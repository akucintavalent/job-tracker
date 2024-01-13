import { IsString, IsEmail, IsUUID, IsOptional } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
