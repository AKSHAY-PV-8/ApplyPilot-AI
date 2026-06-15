import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if(!token) res.status(401).json({message: "Unauthorized"});

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decode;
        next();

    }catch(error){
        res.status(401).json({message: "Invalid or expired token"});
    }
}