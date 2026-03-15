import { Body, Controller, Get, Req } from '@nestjs/common';
import { NotificationService } from './notification.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Role, Roles } from '../common/decorator/roles.decorator.js';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly prismaService: PrismaService,
  ) {}

  @Roles(Role.Seeker, Role.Recruiter)
  @Get('')
  async getNotifications(@Req() req) {
    const notifications = await this.notificationService.getNotifications(
      req.user.userId,
    );
    console.log(req.user)
    return notifications;
  }
}
