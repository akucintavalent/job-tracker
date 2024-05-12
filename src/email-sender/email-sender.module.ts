import { Module } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';

@Module({
  providers: [EmailSenderService],
})
export class EmailSenderModule {}
