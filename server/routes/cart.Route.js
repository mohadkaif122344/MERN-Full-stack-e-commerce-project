import express from "express";
import { addToCart, getUserCart, updateToCart } from "../controller/cart.Controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/update",authMiddleware, updateToCart);
cartRouter.post("/get",authMiddleware, getUserCart);

export default cartRouter;