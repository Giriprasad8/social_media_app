"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: "No token provided" });
    // Expected format: Bearer TOKEN_HERE
    const token = authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Invalid token format" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "SECRET123");
        // attach user id to request object
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Unauthorized" });
    }
}
