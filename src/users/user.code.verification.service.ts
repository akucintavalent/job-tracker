import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCodeVerification } from './entities/user.code.verification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LessThan } from 'typeorm';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { UserFriendlyErrorMessages } from 'src/exceptions/user-friendly-error-messages';
import { EmailSenderService } from 'src/email-sender/email-sender.service';

@Injectable()
export class UserCodeVerificationService {
  constructor(
    @InjectRepository(UserCodeVerification)
    private readonly repository: Repository<UserCodeVerification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailSender: EmailSenderService,
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

  async createAndSendVerificationCode(email: string) {
    const code = await this.createVerificationCode(email);
    await this.emailSender.sendVerificationEmail(email, code);
  }

  async verifyCode(code: string, email: string): Promise<boolean> {
    await this.updateAllExpiredCodes();

    const entity = await this.repository.findOne({
      where: { code: code, user: { email: email } },
      withDeleted: true,
    });

    if (entity == null) this.throw(UserFriendlyErrorMessages.EMAIL_CODE_NOT_FOUND);
    if (entity.deletedAt) this.throw(UserFriendlyErrorMessages.EMAIL_CODE_EXPIRED);

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
    const codeLength = 6;
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < codeLength) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  private throw(userFriendlyMessage: UserFriendlyErrorMessages) {
    throw new BadRequestException(userFriendlyMessage, userFriendlyMessage);
  }
}
