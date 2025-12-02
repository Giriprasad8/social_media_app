import express, { Request, Response } from "express";
import { AppDataSource } from "./database";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Reply } from "./entities/Reply";
import multer from "multer";
import { Media } from "./entities/Media";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/auth";
import { generateEmbedding } from "./utils/embedding";
import { qdrant } from "./vector/qdrant";
import { insertEmbedding } from "./vector/service";
import { savePostToVector } from "./vector/service";
import { Like } from "typeorm";
import { getDistance } from "./utils/distance"; 
import dotenv from "dotenv";
dotenv.config();

import searchRoutes from "./routes/search.routes";

const app = express();
app.use(express.json());
app.set("json spaces", 2);


// ROUTES

app.use("/search", searchRoutes);


// MEDIA ROUTES

import mediaRoutes from "./routes/media.routes";
app.use("/media", mediaRoutes);
app.use("/uploads", express.static("uploads"));


// ====================== USERS ==========================

// REGISTER
app.post("/users/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userRepo = AppDataSource.getRepository(User);

  const hashed = await bcrypt.hash(password, 10);
  const user = userRepo.create({ name, email, password: hashed });
  const saved = await userRepo.save(user);

  return res.json(saved);
});

// LOGIN
app.post("/users/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({ where: { email } });
  if (!user) return res.status(404).send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: user.id }, "SECRET123");

  return res.json({ message: "Login successful", token, user });
});

// GET ALL USERS
app.get("/users", async (_req, res) => {
  const users = await AppDataSource.getRepository(User).find();
  res.json(users);
});

// ====================== POSTS ==========================

// CREATE POST (TOKEN REQUIRED)
app.post("/posts", verifyToken, async (req, res) => {
  const postRepo = AppDataSource.getRepository(Post);
  const userRepo = AppDataSource.getRepository(User);

  const { body, type, lat, lng } = req.body;
  const userId = (req as any).userId;

  const author = await userRepo.findOne({ where: { id: userId } });

  if (!author) return res.status(404).json({ error: "User not found" });

  const post = postRepo.create({
    body,
    type,
    lat,
    lng,
    author,
  });

  const savedPost = await postRepo.save(post);

  // ===============================
//        GENERATE EMBEDDING
// ===============================

try {
  const vector = await generateEmbedding(savedPost.body || "");

  // OPTION 1: Store inside Postgres (requires `embedding` column in Post entity)
  await AppDataSource.createQueryBuilder()
    .update(Post)
    .set({ embedding: vector as any })
    .where("id = :id", { id: savedPost.id })
    .execute();

  // OPTION 2: Insert into Qdrant for vector search
  await savePostToVector(savedPost.id, savedPost.body);

  console.log("Vector embedding saved!");

} catch (err) {
  console.error("Embedding error:", err);
}

  res.json(savedPost);
});


// GET ALL POSTS
// GET /posts (with filters)
app.get("/posts", async (req, res) => {
  try {
    const postRepo = AppDataSource.getRepository(Post);
    const { type, lat, lng, radius, q } = req.query;

    let posts = await postRepo.find({ relations: ["author", "media", "replies"] });

    // Type filter
    if (type && (type === "offering" || type === "request")) {
      posts = posts.filter(p => p.type === type);
    }

    // Text search (simple)
    if (q && typeof q === "string") {
      const term = q.toLowerCase();
      posts = posts.filter(p => (p.body || "").toLowerCase().includes(term));
    }

    // Radius: filter using JS distance util (getDistanceMiles(lat1,lng1, lat2,lng2))
    if (lat && lng && radius) {
      const centerLat = Number(lat);
      const centerLng = Number(lng);
      const rMiles = Number(radius);
      posts = posts.filter(p => {
        if (p.lat == null || p.lng == null) return false;
        const d = getDistanceMiles(centerLat, centerLng, p.lat, p.lng);
        return d <= rMiles;
      });
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: (err as Error).message });
  }
});


// ====================== REPLIES ==========================

// ADD REPLY (TOKEN REQUIRED)
app.post("/replies", verifyToken, async (req: Request, res: Response) => {
  const { message, postId } = req.body;
  const userId = (req as any).userId;
  

  if (!message || !postId) {
    return res.status(400).json({ error: "Missing message or postId" });
  }

  const userRepo = AppDataSource.getRepository(User);
  const postRepo = AppDataSource.getRepository(Post);
  const replyRepo = AppDataSource.getRepository(Reply);

  const author = await userRepo.findOne({ where: { id: userId } });
  if (!author) return res.status(404).json({ error: "User not found" });

  const post = await postRepo.findOne({ where: { id: postId } });
  if (!post) return res.status(404).json({ error: "Post not found" });

  const reply = replyRepo.create({ message, author, post });
  const saved = await replyRepo.save(reply);

  res.json(saved);
});

// GET REPLIES OF A POST
app.get("/posts/:postId/replies", async (req, res) => {
  const replyRepo = AppDataSource.getRepository(Reply);

  const postId = Number(req.params.postId); // ⭐ FIX HERE
  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid postId" });
  }

  const replies = await replyRepo.find({
    where: { post: { id: postId } },
    relations: ["author", "post"],
  });

  res.json(replies);
});

// ====================== MEDIA UPLOAD ==========================

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/media/upload", upload.single("file"), async (req: Request, res: Response) => {
  try {
    const mediaRepo = AppDataSource.getRepository(Media);
    const postRepo = AppDataSource.getRepository(Post);
    const { postId } = (req as any).body;

    const post = await postRepo.findOne({ where: { id: postId } });
    if (!post) return res.status(404).json({ error: "Post not found" });

    const file = (req as any).file;
    if (!file) return res.status(400).json({ error: "File not uploaded" });

    const media = mediaRepo.create({
      url: `/uploads/${file.filename}`,
      post
    });

    const saved = await mediaRepo.save(media);
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: (err as Error).message });
  }
});

// HOME
app.get("/", (_req, res) => {
  res.send("API is running...");
});

export default app;

import { Between } from "typeorm";
import * as geolib from "geolib";

import { getDistance as getDistanceMiles } from "./utils/distance";


app.get("/posts/filter", async (req: Request, res: Response) => {
    try {
        const postRepo = AppDataSource.getRepository(Post);

        let { type, radius, userLat, userLng, search } = req.query;

        const posts = await postRepo.find({
            relations: ["author", "media", "replies"]
        });

        let filtered = posts;

        // --- 1️⃣ FILTER BY TYPE ---
        if (type === "offering" || type === "request") {
            filtered = filtered.filter((p) => p.type === type);
        }

        // --- 2️⃣ FILTER BY KEYWORD ---
        if (search && typeof search === "string") {
            const s = search.toLowerCase();
            filtered = filtered.filter((p) =>
                p.body.toLowerCase().includes(s)
            );
        }

        // --- 3️⃣ FILTER BY RADIUS ---
        if (radius && userLat && userLng) {
            const r = Number(radius);

            filtered = filtered.filter((p) => {
                if (p.lat == null || p.lng == null) return false;

                const dist = getDistanceMiles(
                    Number(userLat),
                    Number(userLng),
                    p.lat,
                    p.lng
                );

                return dist <= r;
            });
        }

        return res.json({ count: filtered.length, posts: filtered });

    } catch (err: any) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

import { vectorSearch } from "./services/search.service";
import { generateSummary } from "./vector/rag";

app.get("/search", async (req, res) => {
  const { q, type } = req.query;

  if (!q) return res.status(400).json({ error: "Missing query" });

  const results = await vectorSearch(q as string, type as string);

  const summary = await generateSummary(results);

  res.json({
    summary,
    results
  });
});


