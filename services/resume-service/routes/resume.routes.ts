import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../middleware/upload.middleware.js";
import { uploadResume } from "../controller/resume.controller.js";

const router = Router();

router.post("/upload", verifyToken, upload.single("resume"), uploadResume);

export default router;