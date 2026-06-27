import express from "express";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { minioClient, GENERATED_BUCKET } from "./config/storage.js";
import generationRoutes from "./routes/generation.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const bucketExists = await minioClient.bucketExists(GENERATED_BUCKET);
if (!bucketExists) {
    await minioClient.makeBucket(GENERATED_BUCKET);
    console.log(`Bucket '${GENERATED_BUCKET}' created`);
}

app.use("/", generationRoutes);

app.listen(env.PORT, () =>
    console.log(`Generation Service running on port ${env.PORT}`)
);