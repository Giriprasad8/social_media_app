import { Router } from "express";
import multer from "multer";
import { AppDataSource } from "../database";
import { Media } from "../entities/Media";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
  const mediaRepo = AppDataSource.getRepository(Media);
  const file =req.file

  const saved = await mediaRepo.save({
    url: `/uploads/${req.file.filename}`,
    post: { id: req.body.postId }
  });

 return  res.json({
    message: "File uploaded",
    originalName: file.originalname,
    path: file.path,
});
});

export default router;
