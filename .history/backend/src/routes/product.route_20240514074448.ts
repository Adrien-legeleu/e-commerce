import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { productController } from "../controllers";

const productRouter = express.Router();

productRouter
  .get("/", isConnectedMiddleware.execute, productController.findAll)
  .get(
    "/:productId",
    isConnectedMiddleware.execute,
    productController.findOneById
  );
