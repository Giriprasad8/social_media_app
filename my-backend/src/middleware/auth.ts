import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "No token provided" });

  // Expected format: Bearer TOKEN_HERE
  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, "SECRET123") as { id: string };

    // attach user id to request object
    (req as any).userId = decoded.id;

    next();

  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
