import express from "express";
import { authController } from "../controllers";
import { isConnectedMiddleware } from "../middlewares";

const authRouter = express.Router();

authRouter
  .get("/check-token", isConnectedMiddleware.execute, authController.checkToken)
  .get(
    "/check-token-admin",
    isConnectedMiddleware.execute,
    authController.checkTokenAdmin
  )
  .post("/login", authController.login)
  .post("/login-admin", authController.loginAdmin)
  .post("/register", authController.register)
  .post("/register-admin", authController.registerAdmin);

export default authRouter;
