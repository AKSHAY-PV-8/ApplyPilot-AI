import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth-router.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());


app.use("/", authRouter);


app.listen(PORT, () => console.log(`server is running on ${PORT}`));
