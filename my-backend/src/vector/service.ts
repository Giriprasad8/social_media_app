import { qdrant } from "./qdrant";
import { generateEmbedding } from "../utils/embedding";
import * as dotenv from 'dotenv';
dotenv.config();
import "dotenv/config";

const COLLECTION = "posts_collection";

export async function insertEmbedding() {
  // Create collection only if not exists
  const collections = await qdrant.getCollections();
  const exists = collections.collections.some((c: any) => c.name === COLLECTION);

  if (!exists) {
    await qdrant.createCollection(COLLECTION, {
      vectors: {
        size: 1536,         // embedding size of text-embedding-3-small
        distance: "Cosine"
      }
    });
    console.log("✅ Qdrant collection created!");
  } else {
    console.log("ℹ️ Qdrant collection already exists");
  }
}

// Store Post Content in Vector DB
export async function savePostToVector(postId: number, text: string) {
  const embedding = await generateEmbedding(text);

  await qdrant.upsert(COLLECTION, {
    points: [
      {
        id: postId,
        vector: embedding,
        payload: { postId, text }
      }
    ]
  });

  console.log("✅ Vector stored for post:", postId);
}

// Semantic Search
export async function semanticSearch(query: string) {
  const embedding = await generateEmbedding(query);

  const results = await qdrant.search(COLLECTION, {
    vector: embedding,
    limit: 5
  });

  return results;
}
