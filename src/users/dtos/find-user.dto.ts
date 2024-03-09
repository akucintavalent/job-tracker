import { IsEmail, IsUUID, IsOptional } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
