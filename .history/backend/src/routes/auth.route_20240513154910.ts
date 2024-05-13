import express from "express";
import { authController } from "../controllers";
import isConnectedMiddleware from "../middlewares";

const authRouter = express.Router();

authRouter
  .post("/login", isConnectedMiddleware.execute, authController.login)
  .post("/register", authController.register);

export default authRouter;
