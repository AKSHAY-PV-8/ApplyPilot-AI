import multer from "multer";
import type { Request } from "express";

const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
];

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF and DOCX files are allowed"));
    }
};

export const upload = multer({
    storage: multer.memoryStorage(), 
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});