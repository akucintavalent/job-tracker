import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailSenderService {
  constructor(private readonly configService: ConfigService) {}

  async sendVerificationEmail(to: string, code: string) {
    await this.sendEmail(to, 'JobTracker Email verification', `Code: ${code}`);
  }

  private async sendEmail(to: string, subject: string, body: string) {
    const token = this.configService.get('RESEND_TOKEN');
    const emailFrom = this.configService.get('NOTIFICATION_EMAIL');
    const resend = new Resend(token);
    const { data, error } = await resend.emails.send({
      from: `JobTracker <${emailFrom}>`,
      to: [to],
      subject: subject,
      html: body,
    });

    if (error) {
      return console.error('Error during sending email', { error });
    }

    console.log('Email sent', { data });
  }
}
