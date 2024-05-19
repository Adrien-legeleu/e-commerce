import express from "express";
import { authController } from "../controllers";

const authRouter = express.Router();

authRouter
  .post("/login", authController.login)
  .post("/login-admin", authController.loginAdmin)
  .post("/register", authController.register)
  .post("/register-admin", authController.registerAdmin);

export default authRouter;
