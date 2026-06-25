import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("5002"),
    DATABASE_URL: z.string(),
    // JWT_SECRET: z.string(),
    // ANTHROPIC_API_KEY: z.string(),
    // AWS_REGION: z.string(),
    // AWS_ACCESS_KEY_ID: z.string(),
    // AWS_SECRET_ACCESS_KEY: z.string(),
    // S3_BUCKET: z.string(),
    // REDIS_HOST: z.string().default('localhost'),
    // REDIS_PORT: z.string().default('6379'),
    // FRONTEND_URL: z.string().default('http://localhost:3000'),
})


export const env = envSchema.parse(process.env);
