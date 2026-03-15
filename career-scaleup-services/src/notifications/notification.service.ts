import { Injectable } from '@nestjs/common';
import { MailingService } from '../mailing/mailing.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Server } from 'socket.io';

@Injectable()
export class NotificationService {
  private server: Server;

  constructor(
    private prismaService: PrismaService,
    private mailingService: MailingService,
  ) {}

  setServer(server: Server) {
    this.server = server;
  }

  async notifyNewMessage(message: any) {
    const sender = await this.prismaService.users.findUnique({
      where: { id: message.senderId },
    });

    const receiver = await this.prismaService.users.findUnique({
      where: { id: message.recieverId },
    });

    if (!sender || !receiver) return;

    const senderName = sender?.fullName || sender?.companyName;

    const notification = await this.prismaService.notification.create({
      data: {
        userId: receiver?.id!,
        type: 'NEW_MESSAGE',
        title: 'New Message',
        message: `${senderName} sent you message`,
        metadata: {
          conversationId: message.conversationId,
          senderId: message.senderId,
          preview: message.content.slice(0, 100),
        },
      },
    });

    this.server
      ?.to(`user:${receiver!.id}`)
      .emit('newNotification', notification);

    if (receiver?.email) {
      this.mailingService.sendNewMessageEmail(
        receiver.email,
        senderName!,
        message.content.slice(0, 120),
      );
    }

    return notification;
  }

  async getNotifications(userId: string) {
    const notifications = await this.prismaService.notification.findMany({
      where: { userId },
    });
    return notifications;
  }
}
