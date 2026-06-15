import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth-router.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,                
}));
app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter);


app.listen(PORT, () => console.log(`server is running on ${PORT}`));
