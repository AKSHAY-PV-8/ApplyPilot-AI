import express from "express";
import { getUser, userLogin, userLogout, userRegistration } from "../controllers/auth-controller.js";
import { verifyToken } from "../middleware/verifyTokenMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", userRegistration);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);
authRouter.get("/user", verifyToken, getUser);



export default authRouter;