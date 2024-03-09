import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
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

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRoleType;
}
