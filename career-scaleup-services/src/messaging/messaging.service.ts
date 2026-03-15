import { NotificationService } from '../notifications/notification.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateConversationDto, SendMessageDto } from './dto/messaging.dto.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagingService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  async createConversation(conversation: CreateConversationDto) {
    const existing = await this.prisma.conversation.findUnique({
      where: { applicationId: conversation.applicationId },
    });

    if (existing) return existing;

    return this.prisma.conversation.create({
      data: {
        applicationId: conversation.applicationId,
        participants: {
          create: [
            { userId: conversation.recruiterId },
            { userId: conversation.seekerId },
          ],
        },
      },
      include: {
        participants: true,
      },
    });
  }

  async getAllConversations(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId: userId },
        },
      },
      include: {
        participants: {
          select: {
            user: {
              select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                companyName: true,
                companyDescription: true,
                summary: true,
                bio: true,
                industry: true,
                logoUrl: true,
                profilePicture: true,
              },
            },
          },
        },
        messages: true,
      },
    });
  }

  async sendMessage(dto: SendMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        conversationId: dto.conversationId,
        recieverId: dto.receiverId,
        senderId: dto.senderId,
        content: dto.content,
      },
    });

    await this.notificationService.notifyNewMessage(message);
    return message;
  }

  async editMessage(messageId: string, newContent: string) {
    return this.prisma.message.update({
      where: { id: messageId },
      data: { content: newContent },
    });
  }

  async deleteMessage(messageId: string) {
    return this.prisma.message.delete({
      where: { id: messageId },
    });
  }

  async getMessages(conversationId: string, limit = 50) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });
  }

  async getConversations(userId: string) {
    return this.prisma.conversation.findMany({
      where: { participants: { some: { userId } } },
      include: { participants: { include: { user: true } }, messages: true },
    });
  }
}
