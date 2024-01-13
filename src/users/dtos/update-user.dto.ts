import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @Matches(/^[a-zA-Z0-9_]{4,16}$/, {
    message: 'Username is not valid.',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRoleType;
}
