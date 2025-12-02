"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
database_1.AppDataSource.initialize().then(() => {
    console.log("Database Connected!");
    app_1.default.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
});
