import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @Matches(/^[a-zA-Z0-9_]{4,16}$/, {
    message: 'Username is not valid.',
  })
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsEnum(UserRole)
  role?: UserRoleType;
}
