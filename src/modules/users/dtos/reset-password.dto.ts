import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  newPassword: string;

  @IsString()
  code: string;

  @IsEmail()
  email: string;
}
