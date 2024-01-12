import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    await this.valiateIfUserExists(dto);

    const user = await this.usersRepository.create(dto);

    return this.usersRepository.save(user);
  }

  private async valiateIfUserExists(dto: CreateUserDto): Promise<void> {
    const existingUsers = await this.usersRepository.find({
      where: [{ email: dto.email }, { username: dto.username }],
    });

    if (existingUsers.some((entity) => entity.email === dto.email))
      throw new BadRequestException(
        dto.email + ' email is alredy in use. User cannot be created.',
      );

    if (existingUsers.some((entity) => entity.username === dto.username))
      throw new BadRequestException(
        dto.username + ' username is alredy in use. User cannot be created.',
      );
  }
}
