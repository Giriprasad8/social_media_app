import app from "./app";
import { AppDataSource } from "./database";
import "dotenv/config";
import { insertEmbedding } from "./vector/service";
import * as dotenv from 'dotenv';
dotenv.config();

AppDataSource.initialize().then(() => {
  console.log("Database Connected!");

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
