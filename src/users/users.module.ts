import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserMapper } from './users.mapper';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';
import { UserCodeVerificationService } from './user.code.verification.service';
import { UserCodeVerification } from './user.code.verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCodeVerification]), EmailSenderModule],
  controllers: [UsersController],
  providers: [UsersService, UserMapper, UserCodeVerificationService],
  exports: [UsersService],
})
export class UsersModule {}
