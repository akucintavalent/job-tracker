import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserMapper } from './users.mapper';
import { EmailSenderModule } from 'src/modules/email-sender/email-sender.module';
import { UserCodeVerificationService } from './user-code-verification.service';
import { UserCodeVerification } from './entities/user.code.verification.entity';
import { BoardsModule } from 'src/modules/boards/boards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserCodeVerification]),
    EmailSenderModule,
    BoardsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserMapper, UserCodeVerificationService],
  exports: [UsersService],
})
export class UsersModule {}
