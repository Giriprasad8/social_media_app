import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { instanceToPlain } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
id: string;


  @Column()
  name!: string;

  @Column()
  email: string;

@Exclude()
@Column()
password: string;

  @CreateDateColumn()
  createdAt: Date;
  posts: any;
}
