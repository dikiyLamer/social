import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post.entity';
import { Chat } from './Chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ unique: true })
  link: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @ManyToMany(() => User)
  @JoinTable()
  subscribes: User[];

  @ManyToMany(() => User)
  @JoinTable()
  subscribers: User[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToOne(() => Chat, (chat) => chat.users)
  chat: Chat;
}
