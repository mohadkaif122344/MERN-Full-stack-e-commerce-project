import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
import { getAdmin, getUser } from "../controller/user.Controller.js";

const userRouter = express.Router();

userRouter.get("/getuser", authMiddleware, getUser);

userRouter.get("/admin", adminAuthMiddleware, getAdmin);

export default userRouter;