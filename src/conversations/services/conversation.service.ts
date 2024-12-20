import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation)
    private conversationModel: typeof Conversation,
    @InjectModel(Message)
    private messageModel: typeof Message,
  ) {}

  async getAllUserConversation(user_id: string): Promise<Conversation[]> {
    return this.conversationModel.findAll({
      where: { user_id: user_id },
      include: ['messages'],
    });
  }

  async getAllMessagesFromConversation(
    conversationId: string,
  ): Promise<Message[]> {
    return this.messageModel.findAll({
      where: { conversation_id: conversationId },
    });
  }

  async findById(conversationId: string): Promise<Conversation | null> {
    return this.conversationModel.findByPk(conversationId);
  }

  async new(user_id: string): Promise<Conversation> {
    return this.conversationModel.create({ user_id: user_id });
  }
}
