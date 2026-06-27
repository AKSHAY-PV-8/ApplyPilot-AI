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


app.use(
    "/api/auth",
    createProxyMiddleware({
        target: "http://localhost:5001", 
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        on: {
            proxyReq: (proxyReq, req, res) => {
                console.log("Proxy Auth-service Request Sent");
            },

            proxyRes: (proxyRes, req, res) => {
                console.log("Proxy Auth-service Response Received");
            },

            error: (err, req, res) => {
                console.log("Proxy Error", err)
            }
        }
    })
)


app.use(
    "/api/resume",
    createProxyMiddleware({
        target: "http://localhost:5002",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        on: {
            proxyReq: (proxyReq, req, res) => {
                console.log("Proxy Resume-service Request Sent");
            },

            proxyRes: (proxyRes, req, res) => {
                console.log("Proxy Resume-service Response Received");
            },

            error: (err, req, res) => {
                console.log("Proxy Error", err)
            }
        }
    })
)

app.use(
    "/api/generate",
    createProxyMiddleware({
        target: "http://localhost:5003",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        on: {
            proxyReq: (proxyReq, req, res) => {
                console.log("Proxy generate-service Request Sent");
            },

            proxyRes: (proxyRes, req, res) => {
                console.log("Proxy generate-service Response Received");
            },

            error: (err, req, res) => {
                console.log("Proxy Error", err)
            }
        }
    })
)

app.listen(5000, () => console.log(`API_Gateway is running on 5000`));