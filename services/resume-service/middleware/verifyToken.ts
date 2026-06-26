import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    
    const token =
        req.cookies?.token ||
        req.headers.authorization?.split(" ")[1];

    console.log("token", token);


    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        console.log("decoded", decoded)
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};