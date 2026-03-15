import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { MessagingService } from './messaging.service.js';
import { CreateConversationDto, SendMessageDto } from './dto/messaging.dto.js';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get('conversation')
  getAllConversations(@Req() req) {
    return this.messagingService.getAllConversations(req.user.userId);
  }

  @Post('conversation')
  createConversation(@Body() conversation: CreateConversationDto) {
    return this.messagingService.createConversation(conversation);
  }

  @Post('message')
  sendMessage(@Body() dto: SendMessageDto) {
    return this.messagingService.sendMessage(dto);
  }

  @Get('conversation/:userId')
  getConversations(@Param('userId') userId: string) {
    return this.messagingService.getConversations(userId);
  }

  @Get('messages/:conversationId')
  getMessages(@Param('conversationId') conversationId: string) {
    return this.messagingService.getMessages(conversationId);
  }

  @Patch('message/edit')
  editMessage(@Body() dto: { messageId: string; content: string }) {
    return this.messagingService.editMessage(dto.messageId, dto.content);
  }

  @Delete('message/delete/:messageId')
  deleteMessage(@Param('messageId') messageId: string) {
    return this.messagingService.deleteMessage(messageId);
  }
}
