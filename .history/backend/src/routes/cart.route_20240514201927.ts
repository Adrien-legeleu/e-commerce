import express from "express";
import { cartController } from "../controllers";
import { isConnectedMiddleware } from "../middlewares";

const cartRouter = express.Router();

cartRouter
  .get("/", isConnectedMiddleware.execute, cartController.findAll)
  .post(
    "/:productid",
    isConnectedMiddleware.execute,
    cartController.placeInCart
  );

export default cartRouter;
