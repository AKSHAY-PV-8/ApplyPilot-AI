import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { uploadToS3 } from "../utils/s3.js";
import prisma from "../config/prisma.js";

const MIME_TO_TYPE: Record<string, string> = {
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

export const uploadResume = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const userId = (req as any).user?.userId;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileType = MIME_TO_TYPE[file.mimetype];
        const s3Key = `resumes/${userId}/${randomUUID()}-${file.originalname}`;

        await uploadToS3(file.buffer, s3Key, file.mimetype);

        const resume = await prisma.resume.create({
            data: {
                userId,
                originalFileName: file.originalname,
                originalFileKey: s3Key,
                originalFileType: fileType,
                status: "UPLOADED",
            },
        });

        return res.status(201).json({
            message: "Resume uploaded successfully",
            resume: {
                id: resume.id,
                fileName: resume.originalFileName,
                status: resume.status,
            },
        });
    } catch (error) {
        console.error("Resume Upload Error:", error);
        return res.status(500).json({ message: "Internal error" });
    }
};