import express from "express";
import authRouter from "./auth.route";
import { isConnectedMiddleware } from "../middlewares";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);

export default appRouter;
