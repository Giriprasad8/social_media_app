import { Router } from "express";
import { semanticSearch } from "../vector/service";
import { AppDataSource } from "../database";
import { Post } from "../entities/Post";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query" });

    const results = await semanticSearch(String(q));

    const postRepo = AppDataSource.getRepository(Post);

    const posts: Post[] = [];

for (const r of results) {

  const pid = Number(r.payload?.postId);

  if (!pid || Number.isNaN(pid)) continue;   // Skip invalid results

  const post = await postRepo.findOne({
    where: { id: pid },
    relations: ["author", "media", "replies"]
  });

  if (post) posts.push(post);
}

res.json(posts);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
