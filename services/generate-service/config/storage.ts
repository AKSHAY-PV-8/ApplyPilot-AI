import * as Minio from "minio";
import { env } from "./env.js";

export const minioClient = new Minio.Client({
    endPoint: env.MINIO_HOST,
    port: env.MINIO_PORT,
    useSSL: false,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
});

export const RESUMES_BUCKET = env.MINIO_BUCKET_RESUMES;
export const GENERATED_BUCKET = env.MINIO_BUCKET_GENERATED;