import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadResume } from "../controller/resume.controller.js";
import { upload } from "../middleware/upload.middleware.js";



const resumeRoutes = express.Router();

resumeRoutes.post("/upload", verifyToken, upload.single("resume"), uploadResume);

export default resumeRoutes;