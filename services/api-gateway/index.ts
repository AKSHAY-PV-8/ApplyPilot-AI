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
        target: "http://auth-service:5001",//localhost
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        on: {
            proxyReq: (proxyReq, req, res) => {
                console.log("Proxy Request Sent");
            },

            proxyRes: (proxyRes, req, res) => {
                console.log("Proxy Response Received");
            },

            error: (err, req, res) => {
                console.log("Proxy Error", err)
            }
        }
    })
)


// app.use(
//     "/api/resume",
//     createProxyMiddleware({
//         target: "http://localhost:5002",
//         changeOrigin: true,
//         cookieDomainRewrite: "localhost",
//     })
// )

app.listen(5000, () => console.log(`API_Gateway is running on 5000`));