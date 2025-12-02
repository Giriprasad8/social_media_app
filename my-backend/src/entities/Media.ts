import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Media {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    url: string;

    @ManyToOne(() => Post, (post) => post.media ,  { onDelete: "CASCADE" })
    post: Post;
 
    @CreateDateColumn()
    createdAt: Date;
}
