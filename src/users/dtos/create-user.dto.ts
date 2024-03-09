import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsEnum(UserRole)
  role?: UserRoleType;
}
