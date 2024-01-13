import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @Matches(/^[a-zA-Z0-9_]{4,16}$/, {
    message: 'Username is not valid.',
  })
  @IsString()
  username: string;

  @IsEnum(UserRole)
  role?: UserRoleType;
}
