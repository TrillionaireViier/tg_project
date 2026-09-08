import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ChatGateway } from '../chat/chat.gateway';

const prisma = new PrismaClient();

@Controller('admin')
export class AdminController {
  constructor(private readonly chatGateway: ChatGateway) {}

  @Get('metrics')
  async getMetrics() {
    const users = await prisma.user.count();
    const chats = await prisma.chat.count();
    const messages = await prisma.message.count();
    return { users, chats, messages };
  }

  @Post('ban/:userId')
  async banUser(@Param('userId') userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { isBanned: true },
    });
    // In real app, disconnect WS socket for user
    return { success: true };
  }

  @Get('spam')
  async getSpamQueue() {
    return prisma.spamReport.findMany({
      where: { status: 'PENDING' },
      include: { message: true },
    });
  }

  @Post('broadcast')
  async broadcast(@Body() data: { text: string }) {
    this.chatGateway.server.emit('broadcast', { message: data.text });
    return { success: true };
  }
}
