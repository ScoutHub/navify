import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../authentification/auth.guard';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';

@Controller('/api/conversations')
@UseGuards(AuthGuard)
export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    private readonly messageService: MessageService,
  ) {}

  @Get('/')
  @Header('Content-Type', 'application/json')
  async getUserConversation(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const userId: string = request['id'];
    return response.status(200).send({
      conversations:
        await this.conversationService.getAllUserConversation(userId),
    });
  }

  @Post('/new')
  @Header('Content-Type', 'application/json')
  async newConversation(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: { content: string },
  ): Promise<Response> {
    const { content } = body;
    const userId: string = request['id'];

    const conversation = await this.conversationService.new(userId);

    const message = await this.messageService.new(content, conversation.id);

    return response.status(201).send({
      conversation: {
        ...conversation.toJSON(),
        messages: [message],
      },
    });
  }

  @Post('/:conversation_id/messages')
  @Header('Content-Type', 'application/json')
  async addMessage(
    @Res() response: Response,
    @Body() body: { content: string },
    @Param('conversation_id') conversation_id: string,
  ): Promise<Response> {
    const { content } = body;

    if (!(await this.conversationService.findById(conversation_id))) {
      return response.status(404).json({ message: 'Conversation not found' });
    }

    const message = await this.messageService.new(content, conversation_id);

    return response.status(201).send({
      message: 'Message added successfully',
      data: message,
    });
  }

  @Get('/:conversation_id')
  @Header('Content-Type', 'application/json')
  async getMessage(
    @Res() response: Response,
    @Param('conversation_id') conversation_id: string,
  ): Promise<Response> {
    if (!(await this.conversationService.findById(conversation_id))) {
      return response.status(404).send({ message: 'Conversation not found' });
    }

    return response
      .status(201)
      .send(
        await this.conversationService.getAllMessagesFromConversation(
          conversation_id,
        ),
      );
  }
}
