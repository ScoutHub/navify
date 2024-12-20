import { UUID } from 'sequelize';
import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Message } from './message.model';

@Table
export class Conversation extends Model {
  @Unique
  @PrimaryKey
  @Default(UUIDV4)
  @Column({
    type: UUID,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: UUID,
  })
  user_id: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Message)
  messages: Message[];
}
