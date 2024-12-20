import { UUID } from 'sequelize';
import { UUIDV4 } from 'sequelize';
import {
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Conversation } from 'src/conversations/models/conversation.model';

@Table
export class User extends Model {
  @Unique
  @PrimaryKey
  @Default(UUIDV4)
  @Column({
    type: UUID,
  })
  id: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  username: string;

  @Column
  password: string;

  @HasMany(() => Conversation)
  conversations: Conversation[];
}
