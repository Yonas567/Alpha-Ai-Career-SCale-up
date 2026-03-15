import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service.js';
import { MailingModule } from '../mailing/mailing.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { NotificationController } from './notification.controller.js';

@Module({
  imports: [PrismaModule, MailingModule],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
