import express from "express";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
import upload from "../middleware/multer.js";
import { addProduct, getProduct, removeProduct, singleProduct, updateProduct } from "../controller/product.Controller.js";

const productRouter = express.Router();

productRouter.post("/add",adminAuthMiddleware,upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),addProduct);

productRouter.get("/list", getProduct);

productRouter.get("/single/:id", singleProduct);

productRouter.delete("/remove/:id",adminAuthMiddleware,removeProduct);

productRouter.put("/update/:id",adminAuthMiddleware,upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),updateProduct);

export default productRouter;
