import { IsEmail, IsString } from 'class-validator';

export class EmailVerificationCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
