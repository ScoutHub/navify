import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './authentification/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { Conversation } from './conversations/models/conversation.model';
import { Message } from './conversations/models/message.model';
import { ConversationModule } from './conversations/conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    ConversationModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Conversation, Message],
      autoLoadModels: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
