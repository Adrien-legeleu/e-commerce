import express from "express";
import authRouter from "./auth.route";
import productRouter from "./product.route";
import cartRouter from "./cart.route";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/products", productRouter);
appRouter.use("/cart", cartRouter);

export default appRouter;
