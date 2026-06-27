import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { generateResume, getJobStatus } from "../controller/generation.controller.js";

const generationRoutes = express.Router();

generationRoutes.post("/generate", verifyToken, generateResume);
generationRoutes.get("/generate/:jobId", verifyToken, getJobStatus);

export default generationRoutes;