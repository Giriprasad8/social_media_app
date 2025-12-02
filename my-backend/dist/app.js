"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const User_1 = require("./entities/User");
const Post_1 = require("./entities/Post");
const Reply_1 = require("./entities/Reply");
const multer_1 = __importDefault(require("multer"));
const Media_1 = require("./entities/Media");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("./middleware/auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set("json spaces", 2);
// ====================== USERS ==========================
// REGISTER
app.post("/users/register", async (req, res) => {
    const { name, email, password } = req.body;
    const userRepo = database_1.AppDataSource.getRepository(User_1.User);
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = userRepo.create({ name, email, password: hashed });
    const saved = await userRepo.save(user);
    return res.json(saved);
});
// LOGIN
app.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    const userRepo = database_1.AppDataSource.getRepository(User_1.User);
    const user = await userRepo.findOne({ where: { email } });
    if (!user)
        return res.status(404).send("User not found");
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        return res.status(400).send("Invalid password");
    const token = jsonwebtoken_1.default.sign({ id: user.id }, "SECRET123");
    return res.json({ message: "Login successful", token, user });
});
// GET ALL USERS
app.get("/users", async (_req, res) => {
    const users = await database_1.AppDataSource.getRepository(User_1.User).find();
    res.json(users);
});
// ====================== POSTS ==========================
// CREATE POST (TOKEN REQUIRED)
app.post("/posts", auth_1.verifyToken, async (req, res) => {
    const postRepo = database_1.AppDataSource.getRepository(Post_1.Post);
    const userRepo = database_1.AppDataSource.getRepository(User_1.User);
    const { body, type, lat, lng } = req.body;
    const userId = req.userId;
    const author = await userRepo.findOne({ where: { id: userId } });
    if (!author)
        return res.status(404).json({ error: "User not found" });
    const post = postRepo.create({
        body,
        type,
        lat,
        lng,
        author,
    });
    const savedPost = await postRepo.save(post);
    res.json(savedPost);
});
// GET ALL POSTS
app.get("/posts", async (req, res) => {
    const posts = await database_1.AppDataSource.getRepository(Post_1.Post).find({
        relations: ["author", "media", "replies"],
    });
    res.json(posts);
});
const distance_1 = require("./utils/distance"); // ➜ We'll create this file
app.get("/posts/filter", async (req, res) => {
    try {
        const postRepo = database_1.AppDataSource.getRepository(Post_1.Post);
        const { type, search, radius, lat, lng } = req.query;
        let posts = await postRepo.find({
            relations: ["author", "media", "replies"]
        });
        // ---------------------- FILTER 1: TYPE -----------------------
        if (type === "offering" || type === "request") {
            posts = posts.filter((p) => p.type === type);
        }
        // ---------------------- FILTER 2: SEARCH ----------------------
        if (search) {
            const keyword = search.toLowerCase();
            posts = posts.filter((p) => p.body.toLowerCase().includes(keyword));
        }
        // ---------------------- FILTER 3: RADIUS ----------------------
        if (radius && lat && lng) {
            const r = Number(radius);
            const userLat = Number(lat);
            const userLng = Number(lng);
            posts = posts.filter((p) => {
                if (!p.lat || !p.lng)
                    return false;
                const dist = (0, distance_1.getDistance)(userLat, userLng, p.lat, p.lng);
                return dist <= r;
            });
        }
        return res.json(posts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});
// ====================== REPLIES ==========================
// ADD REPLY (TOKEN REQUIRED)
app.post("/replies", auth_1.verifyToken, async (req, res) => {
    const { message, postId } = req.body;
    const userId = req.userId;
    if (!message || !postId) {
        return res.status(400).json({ error: "Missing message or postId" });
    }
    const userRepo = database_1.AppDataSource.getRepository(User_1.User);
    const postRepo = database_1.AppDataSource.getRepository(Post_1.Post);
    const replyRepo = database_1.AppDataSource.getRepository(Reply_1.Reply);
    const author = await userRepo.findOne({ where: { id: userId } });
    if (!author)
        return res.status(404).json({ error: "User not found" });
    const post = await postRepo.findOne({ where: { id: postId } });
    if (!post)
        return res.status(404).json({ error: "Post not found" });
    const reply = replyRepo.create({ message, author, post });
    const saved = await replyRepo.save(reply);
    res.json(saved);
});
// GET REPLIES OF A POST
app.get("/posts/:postId/replies", async (req, res) => {
    const replyRepo = database_1.AppDataSource.getRepository(Reply_1.Reply);
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
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
app.use("/uploads", express_1.default.static("uploads"));
app.post("/media/upload", upload.single("file"), async (req, res) => {
    const { postId } = req.body;
    const post = await database_1.AppDataSource.getRepository(Post_1.Post).findOne({
        where: { id: postId },
    });
    if (!post)
        return res.status(404).send("Post not found");
    if (!req.file)
        return res.status(400).send("File not uploaded");
    const media = database_1.AppDataSource.getRepository(Media_1.Media).create({
        url: `/uploads/${req.file.filename}`,
        post,
    });
    const saved = await database_1.AppDataSource.getRepository(Media_1.Media).save(media);
    res.json(saved);
});
// HOME
app.get("/", (_req, res) => {
    res.send("API is running...");
});
exports.default = app;
const distance_2 = require("./utils/distance");
app.get("/posts/filter", async (req, res) => {
    try {
        const postRepo = database_1.AppDataSource.getRepository(Post_1.Post);
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
            filtered = filtered.filter((p) => p.body.toLowerCase().includes(s));
        }
        // --- 3️⃣ FILTER BY RADIUS ---
        if (radius && userLat && userLng) {
            const r = Number(radius);
            filtered = filtered.filter((p) => {
                if (p.lat == null || p.lng == null)
                    return false;
                const dist = (0, distance_2.getDistance)(Number(userLat), Number(userLng), p.lat, p.lng);
                return dist <= r;
            });
        }
        return res.json({ count: filtered.length, posts: filtered });
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});
const search_service_1 = require("./services/search.service");
const rag_1 = require("./vector/rag");
app.get("/search", async (req, res) => {
    const { q, type } = req.query;
    if (!q)
        return res.status(400).json({ error: "Missing query" });
    const results = await (0, search_service_1.vectorSearch)(q, type);
    const summary = await (0, rag_1.generateSummary)(results);
    res.json({
        summary,
        results
    });
});
