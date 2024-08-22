import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole, UserRoleType } from '../enums/user-role.enum';
import { BaseDto } from '../../../dtos/base.dto';

export class UserDto extends BaseDto {
  @ApiProperty({ type: 'string', format: 'email' })
  @IsEmail()
  email: string;

  // @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRoleType;

  @ApiProperty({ type: 'string' })
  @IsString()
  firstName: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  lastName: string;
}
