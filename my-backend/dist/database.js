"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Post_1 = require("./entities/Post");
const Reply_1 = require("./entities/Reply");
const Media_1 = require("./entities/Media");
require("reflect-metadata");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres", // your postgres username
    password: "9843679725", // your password
    database: "mydb", // your DB name
    synchronize: true,
    logging: true,
    entities: [User_1.User, Post_1.Post, Reply_1.Reply, Media_1.Media],
});
