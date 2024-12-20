import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from '../models/message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message,
  ) {}

  async new(content: string, conversation_id: string): Promise<Message> {
    return this.messageModel.create({
      content,
      conversation_id,
    });
  }
}
