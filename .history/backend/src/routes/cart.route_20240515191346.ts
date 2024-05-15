import express from "express";
import { cartController } from "../controllers";
import { isConnectedMiddleware } from "../middlewares";

const cartRouter = express.Router();

cartRouter
  .get("/", isConnectedMiddleware.execute, cartController.findAll)
  .post(
    "/:productId",
    isConnectedMiddleware.execute,
    cartController.placeInCart
  )
  .delete(
    "/:productId",
    isConnectedMiddleware.execute,
    cartController.removeToCart
  );

export default cartRouter;
