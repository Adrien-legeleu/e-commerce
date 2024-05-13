import express from "express";
import { authController } from "../controllers";

const authRouter = express.Router();

authRouter.get("/login", authController.login);
