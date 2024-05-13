import express from "express";
import authRouter from "./auth.route";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
