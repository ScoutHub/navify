import { UUID } from 'sequelize';
import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Conversation } from './conversation.model';

@Table
export class Message extends Model {
  @Unique
  @PrimaryKey
  @Default(UUIDV4)
  @Column({
    type: UUID,
  })
  id: string;

  @Column
  content: string;

  @ForeignKey(() => Conversation)
  @Column({
    type: UUID,
  })
  conversation_id: string;

  @BelongsTo(() => Conversation)
  conversation: Conversation;
}
