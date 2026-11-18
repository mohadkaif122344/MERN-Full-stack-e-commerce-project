import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRouter from "./routes/auth.Route.js";
import userRouter from "./routes/user.Route.js";
import productRouter from "./routes/products.Route.js";
import cartRouter from "./routes/cart.Route.js";
import orderRouter from "./routes/order.Route.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({origin: ["https://mern-full-stack-e-commerce-project-five.vercel.app",
      "https://mern-full-stack-e-commerce-project-chi.vercel.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


connectDB();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}!`);
});
