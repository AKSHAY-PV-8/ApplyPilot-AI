import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import resumeRoutes from "./routes/resume.routes.js";
import { env } from "./config/env.js";


const app = express();

app.use(express.json());
// app.use(cookieParser());
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true,
//     })
// );

// app.use("/", resumeRoutes);

// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     if (err instanceof multer.MulterError) {
//         return res.status(400).json({ message: err.message });
//     }
//     if (err) {
//         return res.status(400).json({ message: err.message || "Upload error" });
//     }
//     next();
// });

const PORT = env.PORT || 5002;
app.listen(PORT, () => console.log(`Resume Service is running on ${PORT}`));