import type { Request, Response } from "express";
import { BUCKET_NAME, minioClient } from "../config/storage.js";
import { v4 as uuid } from "uuid";
import prisma from "../utils/prisma.js";


export const uploadResume = async (req: Request, res: Response) => {
    try {
        console.log("hitting api")
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file provided" });

        const userId = req.user?.userId.toString();
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const fileKey = `${userId}/${uuid()}-${file.originalname}`;

        await minioClient.putObject(
            BUCKET_NAME,
            fileKey,
            file.buffer,
            file.size,
            { "Content-Type": file.mimetype }
        );

        const resumeFile = await prisma.resumeFile.create({
            data: {
                userId,
                s3Key: fileKey,
                originalName: file.originalname,
                mimeType: file.mimetype,
                sizeBytes: file.size,
                status: "uploaded",
            },
        })
        console.log("file successfully uploader");
        res.json({ success: true, fileId: resumeFile.id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
}