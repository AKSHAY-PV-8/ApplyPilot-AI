import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware"

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());

app.use(
    "/api/auth",
    createProxyMiddleware({
        target: "http://localhost:5001",
        changeOrigin: true
    })
)

app.listen(5000, () => console.log(`API_Gateway is running on 5000`));