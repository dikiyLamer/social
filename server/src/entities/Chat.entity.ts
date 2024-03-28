import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatMessage } from './Message.entity';
import { User } from './User.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => ChatMessage, (message) => message.chat)
  messages: ChatMessage[];

  @OneToMany(() => User, (user) => user.chat)
  users: User[];
}
