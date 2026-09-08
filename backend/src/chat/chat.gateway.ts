import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AesService } from '../crypto/aes.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly aesService: AesService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { chatId: string; senderId: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    const encryptedText = this.aesService.encrypt(data.text);

    // Save to DB
    const message = await prisma.message.create({
      data: {
        text: encryptedText,
        senderId: data.senderId,
        chatId: data.chatId,
      },
    });

    // Broadcast to room (chatId)
    this.server.to(data.chatId).emit('receiveMessage', {
      id: message.id,
      chatId: data.chatId,
      senderId: data.senderId,
      text: data.text, // Sending decrypted text for simplicity in mock
      createdAt: message.createdAt,
    });
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(chatId);
  }
}
