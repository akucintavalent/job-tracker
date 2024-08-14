import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserAlreadyExistsException } from './exceptions/user-exists.exception';
import { FindUserDto } from './dtos/find-user.dto';
import { FindUsersDto } from './dtos/find-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserCodeVerificationService } from './user-code-verification.service';
import { BoardsService } from '../boards/boards.service';
import { VerificationProcess } from './enums/verification-process.enum';
import * as bcrypt from 'bcrypt';
import { EmailVerificationCodeDto } from './dtos/email-verification-code.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly userCodeVerificationService: UserCodeVerificationService,
    private readonly boardService: BoardsService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    await this.validateIfUserExists(dto.email);
    const user = this.usersRepository.create(dto);

    const entity = await this.usersRepository.save(user);

    await this.boardService.createDefaultBoard(entity.id);

    await this.userCodeVerificationService.createAndSendVerificationCode(
      user.email,
      VerificationProcess.USER_SIGNUP,
    );
    return user;
  }

  private async validateIfUserExists(email: string): Promise<void> {
    const userExists = await this.usersRepository.existsBy({ email });

    if (userExists) {
      throw new UserAlreadyExistsException(
        `'${email}' email is already in use. User cannot be created.`,
      );
    }
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

  async updateIsEmailVerified(body: EmailVerificationCodeDto) {
    await this.userCodeVerificationService.verifyUserCode(
      { email: body.email },
      body.code,
      VerificationProcess.USER_SIGNUP,
    );

    const userEntity = await this.usersRepository.findOneBy({ email: body.email });
    userEntity.isEmailVerified = true;
    await this.usersRepository.save(userEntity);
  }

  async remove(id: string, code: string): Promise<User> {
    await this.userCodeVerificationService.verifyUserCode(
      { id: id },
      code,
      VerificationProcess.USER_DELETE,
    );

    const user = await this.findOneBy({ id });
    return this.usersRepository.remove(user);
  }

  async updatePassword(email: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.findOneBy({ email });

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!passwordIsCorrect) {
      throw new UnauthorizedException();
    }

    user.password = newPassword;
    await this.usersRepository.save(user);
  }

  async resetPassword(email, code, newPassword) {
    await this.userCodeVerificationService.verifyUserCode(
      { email },
      code,
      VerificationProcess.USER_RESET_PASSWORD,
    );

    const user = await this.findOneBy({ email });

    user.password = newPassword;
    await this.usersRepository.save(user);
  }
}
