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
  )
  .post("/", isConnectedMiddleware.execute, productController.create)
  .patch(
    "/:productId",
    isConnectedMiddleware.execute,
    productController.updateOneById
  )
  .delete(
    "/:productId",
    isConnectedMiddleware.execute,
    productController.deleteOneById
  );

export default productRouter;
