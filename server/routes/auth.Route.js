import express from "express";
import { adminLogin, login, logout, ragister } from "../controller/auth.Controller.js";

const authRouter = express.Router();

authRouter.post("/register", ragister);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/admin", adminLogin);

export default authRouter;
