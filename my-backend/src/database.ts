import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Reply } from "./entities/Reply";
import { Media } from "./entities/Media";
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",   // your postgres username
  password: "9843679725",       // your password
  database: "mydb",       // your DB name
  synchronize: true,
  logging: true,
  entities: [User,Post, Reply, Media],
 
});
