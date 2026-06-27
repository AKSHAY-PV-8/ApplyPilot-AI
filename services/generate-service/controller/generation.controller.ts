import type { Request, Response } from "express";
import prisma from "../utils/prisma.js";
import { extractTextFromResume } from "../services/extractor.service.js";
import { tailorResumeWithAI } from "../services/ai.service.js";
import { compileAndUploadPDF } from "../services/latex.service.js";
import { minioClient, GENERATED_BUCKET } from "../config/storage.js";


export const generateResume = async (req: Request, res: Response) => {
    const userId = req.user?.userId.toString();
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    console.log("hit pipeline")

    const { resumeFileId, s3Key, jobDescription } = req.body;
    if (!resumeFileId || !s3Key || !jobDescription) {
        return res.status(400).json({ error: "resumeFileId, s3Key, and jobDescription are required" });
    }

    const job = await prisma.generationJob.create({
        data: { userId, resumeFileId, jobDescription, status: "processing" },
    });

    (async () => {
        try {
            console.log("Step 1: Extracting text from resume...");
            const resumeText = await extractTextFromResume(s3Key);
            console.log("Step 1 done. Text length:", resumeText.length);

            console.log("Step 2: Sending to Groq AI...");
            const latexSource = await tailorResumeWithAI(resumeText, jobDescription);
            console.log("Step 2 done. LaTeX length:", latexSource.length);

            console.log("Step 3: Compiling PDF with pdflatex...");
            const outputS3Key = await compileAndUploadPDF(latexSource, userId);
            console.log("Step 3 done. Output key:", outputS3Key);

            await prisma.generationJob.update({
                where: { id: job.id },
                data: { status: "done", outputS3Key },
            });

            console.log("Job completed successfully:", job.id);
        } catch (err) {
            console.error("Generation pipeline failed:", err);
            await prisma.generationJob.update({
                where: { id: job.id },
                data: {
                    status: "failed",
                    errorMessage: err instanceof Error ? err.message : "Unknown error",
                },
            });
        }
    })();

    return res.status(202).json({ jobId: job.id, status: "processing" });
};

export const getJobStatus = async (req: Request, res: Response) => {
    const userId = req.user?.userId.toString();
    const jobId = req.params.jobId as string;

    const job = await prisma.generationJob.findUnique({ where: { id: jobId } });
    if (!job || job.userId !== userId) {
        return res.status(404).json({ error: "Job not found" });
    }

    if (job.status !== "done" || !job.outputS3Key) {
        return res.json({ jobId: job.id, status: job.status, errorMessage: job.errorMessage });
    }

    const downloadUrl = await minioClient.presignedGetObject(
        GENERATED_BUCKET,
        job.outputS3Key,
        15 * 60
    );

    return res.json({ jobId: job.id, status: "done", downloadUrl });
};