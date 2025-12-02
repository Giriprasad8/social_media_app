import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Reply } from "./Reply";
import { Media } from "./Media";


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

 @Column({ type: "text", nullable: false })
body!: string;


  @Column({ type: "varchar", length: 20 })
  type!: "offering" | "request";

  @Column({ type: "float", nullable: true })
  lat!: number | null;

  @Column({ type: "float", nullable: true })
  lng!: number | null;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author!: User;

  @OneToMany(() => Reply, (reply) => reply.post)
  replies!: Reply[];

  @OneToMany(() => Media, (media) => media.post, { cascade: true })
media: Media[];

  @CreateDateColumn()
  createdAt!: Date;
}


