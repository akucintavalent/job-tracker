import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserAlreadyExistsException } from './exceptions/user-exists.exception';
import { FindUserDto } from './dtos/find-user.dto';
import { FindUsersDto } from './dtos/find-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    await this.valiateIfUserExists(dto);
    const user = await this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

  private async valiateIfUserExists({
    email,
    username,
  }: {
    email: string;
    username: string;
  }): Promise<void> {
    const existingUsers = await this.usersRepository.find({
      where: [{ email }, { username }],
    });

    if (existingUsers.some((entity: User) => entity.email === email))
      throw new UserAlreadyExistsException(
        `'${email}' email is alredy in use. User cannot be created.`,
      );

    if (existingUsers.some((entity: User) => entity.username === username))
      throw new UserAlreadyExistsException(
        `'${username}' username is alredy in use. User cannot be created.`,
      );
  }

  findOneBy(where: FindUserDto): Promise<User> {
    const user = this.usersRepository.findOneBy(where);

    if (!user) {
      throw new NotFoundException(`User with properties '${JSON.stringify(where)}' not found.`);
    }

    return user;
  }

  findBy(where: FindUsersDto): Promise<User[]> {
    return this.usersRepository.findBy(where);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOneBy({ id });
    Object.assign(user, dto);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOneBy({ id });
    return this.usersRepository.remove(user);
  }
}
