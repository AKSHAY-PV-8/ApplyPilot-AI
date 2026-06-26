import express from "express";
import { env } from "./config/env.js";
import resumeRoutes from "./routes/resume.routes.js";
import cookieParser from "cookie-parser"
import { BUCKET_NAME, minioClient } from "./config/storage.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true,
//     })
// );

const bucketExists = await minioClient.bucketExists(BUCKET_NAME);
if (!bucketExists) {
    await minioClient.makeBucket(BUCKET_NAME);
    console.log(`Bucket '${BUCKET_NAME}' created`);
}

app.use("/", resumeRoutes);


const PORT = env.PORT || 5002;
app.listen(PORT, () => console.log(`Resume Service is running on ${PORT}`));