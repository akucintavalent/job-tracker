import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCodeVerification } from './user.code.verification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LessThan } from 'typeorm';

@Injectable()
export class UserCodeVerificationService {
  private readonly BAD_VERIFICATION_CODE_EXCEPTION = 'Email Verification Code or User are invalid';
  constructor(
    @InjectRepository(UserCodeVerification)
    private readonly repository: Repository<UserCodeVerification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createVerificationCode(email: string): Promise<string> {
    const code = this.generateCode();
    const user = await this.userRepository.findOne({
      select: { id: true },
      where: { email: email },
    });
    const entity = this.repository.create({ code: code, user: { id: user.id } });
    await this.repository.save(entity);
    return code;
  }

  async verifyCode(code: string, email: string): Promise<boolean> {
    if (code == null || email == null)
      throw new BadRequestException(this.BAD_VERIFICATION_CODE_EXCEPTION);

    await this.updateAllExpiredCodes();

    const entity = await this.repository.findOneBy({ code: code, user: { email: email } });
    if (entity == null) throw new BadRequestException(this.BAD_VERIFICATION_CODE_EXCEPTION);
    await this.repository.update({ id: entity.id }, { deletedAt: new Date().toISOString() });
    await this.userRepository.update({ email: email }, { isEmailVerified: true });
    return true;
  }

  private async updateAllExpiredCodes() {
    const a5minAgo = new Date(new Date().getTime() - 1000 * 60 * 5).toISOString();
    await this.repository.update(
      { createdAt: LessThan(a5minAgo) },
      { deletedAt: new Date().toISOString() },
    );
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
