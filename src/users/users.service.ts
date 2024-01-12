import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserAlreadyExistsException } from './exceptions/user-exists.exception';

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

  private async valiateIfUserExists({
    email,
    username,
  }: {
    email: string;
    username: string;
  }): Promise<void> {
    const existingUsers = await this.usersRepository.find({
      where: [{ email: email }, { username: username }],
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
}
