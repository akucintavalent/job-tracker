import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsUUID, Matches } from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';

export class UserDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ type: 'string', format: 'email' })
  @IsEmail()
  email: string;

  // @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @Matches(/^[a-zA-Z0-9_]{4,16}$/, {
    message: 'Username is not valid.',
  })
  @IsString()
  username: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRoleType;
}
