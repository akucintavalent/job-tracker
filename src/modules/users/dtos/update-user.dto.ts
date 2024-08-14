import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRoleType;
}
