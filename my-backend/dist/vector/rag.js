"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = void 0;
exports.generateSummary = generateSummary;
const openai_1 = __importDefault(require("openai"));
exports.openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
async function generateSummary(posts) {
    const text = posts.map(p => p.payload.body).join("\n");
    const result = await exports.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: "Hello" }],
    });
    console.log(result);
}
