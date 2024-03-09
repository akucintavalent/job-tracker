import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserMapper {
  toDto(entity: User) {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.role = entity.role;
    return dto;
  }
}
