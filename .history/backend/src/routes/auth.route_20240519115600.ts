import express from "express";
import { authController } from "../controllers";
import { isConnectedMiddleware } from "../middlewares";

const authRouter = express.Router();

authRouter
  .post("/login", authController.login)
  .post(
    "/login-admin",
    isConnectedMiddleware.execute,
    authController.loginAdmin
  )
  .post("/register", authController.register)
  .post(
    "/register-admin",
    isConnectedMiddleware.execute,
    authController.registerAdmin
  );

export default authRouter;
