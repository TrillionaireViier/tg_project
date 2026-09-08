import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ChatGateway } from './chat/chat.gateway';
import { AesService } from './crypto/aes.service';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [],
  controllers: [AppController, AdminController],
  providers: [AppService, ChatGateway, AesService],
})
export class AppModule {}
