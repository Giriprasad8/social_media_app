import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Reply {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  author: User;

  @ManyToOne(() => Post, (post) => post.replies)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
