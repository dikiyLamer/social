import { DataSource } from 'typeorm';
import { Post } from '../entities/Post.entity';
import { User } from '../entities/User.entity';
import { Chat } from '../entities/Chat.entity';
import { ChatMessage } from '../entities/Message.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'social',
  password: 'social',
  database: 'social',
  synchronize: true,
  logging: false,
  entities: [Post, User, Chat, ChatMessage],
  subscribers: [],
  migrations: [],
});
