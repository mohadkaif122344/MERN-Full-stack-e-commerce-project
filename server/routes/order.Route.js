import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from "../controller/order.Controller.js";

const orderRouter = express.Router();

// User 
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/razorpay", authMiddleware, placeOrderRazorpay);
orderRouter.post("/verifyRazorpay", authMiddleware, verifyRazorpay);
orderRouter.post("/userorders", authMiddleware, userOrders);

// Admin 
orderRouter.post("/list", adminAuthMiddleware, allOrders);
orderRouter.post("/status", adminAuthMiddleware, updateStatus);

export default orderRouter;
