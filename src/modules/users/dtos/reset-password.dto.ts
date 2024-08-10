import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;

  @IsEmail()
  email: string;
}
