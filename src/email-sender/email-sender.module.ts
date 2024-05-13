import { Module } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [EmailSenderService, ConfigService],
  exports: [EmailSenderService],
})
export class EmailSenderModule {}
