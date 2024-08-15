import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserMapper {
  toDto(entity: User) {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.role = entity.role;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
