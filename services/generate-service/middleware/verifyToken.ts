import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";



export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string | number };
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
};