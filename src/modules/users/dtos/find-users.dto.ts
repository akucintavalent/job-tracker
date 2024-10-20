import { IsEmail, IsUUID, IsOptional, IsEnum, IsString } from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';

export class FindUsersDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRoleType;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
