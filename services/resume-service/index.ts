import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";


const PORT = process.env.PORT || 5002;

const app = express();
app.use(helmet());
app.use(express.json());



app.listen(env.PORT, () => console.log(`server is running on ${PORT}`));