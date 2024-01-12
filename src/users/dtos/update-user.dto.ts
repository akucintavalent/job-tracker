import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';

export class UpdateUserDto {
  @ApiProperty({ type: 'string', format: 'email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty()
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
