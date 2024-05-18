import { IsString } from 'class-validator';

export class EmailVerificationCodeDto {
  @IsString()
  code: string;
}
