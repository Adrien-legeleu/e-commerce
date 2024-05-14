import express from "express";
import authRouter from "./auth.route";
import productRouter from "./product.route";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/products", productRouter);

export default appRouter;
