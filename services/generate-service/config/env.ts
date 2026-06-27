import dotenv from "dotenv";

dotenv.config();


const required = (key: string): string => {
    const val = process.env[key];
    if (!val) throw new Error(`Missing required env var: ${key}`);
    return val;
};

export const env = {
    PORT: process.env.PORT ?? "5003",
    DATABASE_URL: required("DATABASE_URL"),
    JWT_SECRET: required("JWT_SECRET"),
    GROQ_API_KEY: required("GROQ_API_KEY"),             
    MINIO_HOST: process.env.MINIO_HOST ?? "localhost",
    MINIO_PORT: parseInt(process.env.MINIO_PORT ?? "9000"),
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY ?? "minioadmin",
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY ?? "minioadmin",
    MINIO_BUCKET_RESUMES: process.env.MINIO_BUCKET_RESUMES ?? "resumes",
    MINIO_BUCKET_GENERATED: process.env.MINIO_BUCKET_GENERATED ?? "generated-resumes",
};