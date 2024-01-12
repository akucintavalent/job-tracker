import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';

export class UpdateUserDto {
  @ApiProperty({ type: 'string', format: 'email' })
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

  @IsEnum(UserRole)
  role: UserRoleType;
}
