import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Chat } from './Chat.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @CreateDateColumn()
  created: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @Column()
  text: string;
}
