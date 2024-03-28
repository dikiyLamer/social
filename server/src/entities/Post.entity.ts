import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  likes: number;

  @CreateDateColumn()
  created: Date;

  @ManyToMany(() => User)
  @JoinTable()
  likedUsers: User[];

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
