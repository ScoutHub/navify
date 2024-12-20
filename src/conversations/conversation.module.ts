import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conversation } from './models/conversation.model';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';
import { Message } from './models/message.model';

@Module({
  imports: [SequelizeModule.forFeature([Conversation, Message])],
  controllers: [ConversationController],
  providers: [ConversationService, MessageService],
  exports: [SequelizeModule],
})
export class ConversationModule {}
