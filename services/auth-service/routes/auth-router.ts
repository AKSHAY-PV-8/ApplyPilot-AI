import express from "express";
import { userLogin, userLogout, userRegistration } from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/register", userRegistration);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);



export default authRouter;