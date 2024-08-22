import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserMapper {
  toDto(user: User) {
    const dto = new UserDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.role = user.role;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    return dto;
  }
}
