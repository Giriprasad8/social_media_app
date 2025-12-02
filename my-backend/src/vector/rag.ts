import OpenAI from "openai";
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateSummary(posts: any[]) {
  const text = posts.map(p => p.payload.body).join("\n");

  const result = await openai.chat.completions.create({
  model: "gpt-4.1-mini",
  messages: [{ role: "user", content: "Hello" }],
});

console.log(result);
}
