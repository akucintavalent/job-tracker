import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCodeVerification } from './entities/user.code.verification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LessThan } from 'typeorm';
import { BadRequestException } from '../../exceptions/bad-request.exception';
import { UserFriendlyErrorMessages } from '../../exceptions/user-friendly-error-messages';
import { EmailSenderService } from '../email-sender/email-sender.service';
import { VerificationProcessType } from './enums/verification-process.enum';
import { ArgumentInvalidException } from '../../exceptions/argument-invalid.exceptions';

@Injectable()
export class UserCodeVerificationService {
  constructor(
    @InjectRepository(UserCodeVerification)
    private readonly userCodeVerificationRepository: Repository<UserCodeVerification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailSender: EmailSenderService,
  ) {}

  async verifyUserCode(
    user: { id?: string; email?: string },
    code: string,
    process: VerificationProcessType,
  ) {
    if (!user.id && !user.email) {
      throw new ArgumentInvalidException('One of user.id or user.email field is required.');
    }

    await this.updateAllExpiredCodes();

    const entity = await this.userCodeVerificationRepository.findOne({
      where: { process: process, code: code, user: { id: user.id, email: user.email } },
      withDeleted: true,
    });

    if (entity === null) {
      this.throw(UserFriendlyErrorMessages.EMAIL_CODE_NOT_FOUND);
    }
    if (entity.deletedAt) {
      this.throw(UserFriendlyErrorMessages.EMAIL_CODE_EXPIRED);
    }

    const userEntity = await this.userRepository.findOne({
      where: [{ email: user.email }, { id: user.id }],
    });

    userEntity.isEmailVerified = true;
    await this.userRepository.save(userEntity);

    await this.userCodeVerificationRepository.softDelete({ id: entity.id });
    return true;
  }

  async createVerificationCode(
    email: string,
    processType: VerificationProcessType,
  ): Promise<string> {
    const code = this.generateCode();
    const user = await this.userRepository.findOne({
      select: { id: true },
      where: { email: email },
    });

    if (!user) {
      throw new ArgumentInvalidException('User not found. Email field is invalid.');
    }

    const userCodeVerification = this.userCodeVerificationRepository.create({
      code: code,
      process: processType,
      user: { id: user.id },
    });
    await this.userCodeVerificationRepository.save(userCodeVerification);
    return userCodeVerification.code;
  }

  async createAndSendVerificationCode(email: string, processType: VerificationProcessType) {
    const code = await this.createVerificationCode(email, processType);
    await this.emailSender.sendVerificationEmail(email, code);
  }

  private async updateAllExpiredCodes() {
    const moment5minAgo = new Date(new Date().getTime() - 1000 * 60 * 5).toISOString();
    await this.userCodeVerificationRepository.update(
      { createdAt: LessThan(moment5minAgo) },
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
