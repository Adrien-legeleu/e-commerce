import express from "express";
import { authController } from "../controllers";
import { isConnectedMiddleware } from "../middlewares";

const authRouter = express.Router();

authRouter
  .get(
    "/check-token",
    isConnectedMiddleware.execute,
    authController.checkTokenAdmin
  )
  .post("/login", authController.loginAdmin)
  .post("/register", authController.registerAdmin);

export default authRouter;
