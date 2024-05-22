import { IsEmail } from 'class-validator';

export class CreateEmailVerificationCode {
  @IsEmail()
  email: string;
}
