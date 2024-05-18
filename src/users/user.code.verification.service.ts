import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCodeVerification } from './user.code.verification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserCodeVerificationService {
  private readonly BAD_VERIFICATION_CODE_EXCEPTION = 'Email Verification Code or User are invalid';
  constructor(
    @InjectRepository(UserCodeVerification)
    private readonly repo: Repository<UserCodeVerification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createVerificationCode(userId: string) {
    const entity = this.repo.create({ code: this.generateCode(), user: { id: userId } });
    await this.repo.save(entity);
  }

  async verifyCode(code: string, userId: string): Promise<boolean> {
    // TODO: delete all expired verification codes
    if (code == null || userId == null)
      throw new BadRequestException(this.BAD_VERIFICATION_CODE_EXCEPTION);
    const entity = await this.repo.findOneBy({ code: code, user: { id: userId } });
    if (entity == null) throw new BadRequestException(this.BAD_VERIFICATION_CODE_EXCEPTION);
    await this.repo.remove(entity);
    await this.userRepository.update({ id: userId }, { isEmailVerified: true });
    return true;
  }

  private generateCode() {
    let result = '';
    const codeLenght = 6;
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < codeLenght) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
