import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendVerificationOtp(email: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Your Verification OTP',
        html: `<p>Your OTP is <strong>${otp}</strong></p>`,
      });
    } catch (error) {
      console.error('Failed to send OTP:', error);
      throw new Error('Failed to send OTP. Please try again.');
    }
  }

   async sendNewMessageEmail(
    email: string,
    senderName: string,
    messagePreview: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: `New message from ${senderName}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h3>You have a new message</h3>
            <p><strong>${senderName}</strong> sent you a message:</p>
            <blockquote style="border-left: 3px solid #6366f1; padding-left: 12px;">
              ${messagePreview}
            </blockquote>
            <p>Log in to your account to reply.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Failed to send message email:', error);
    }
  }
}
