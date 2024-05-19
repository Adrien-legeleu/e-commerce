import express from "express";
import { productController } from "../controllers";
import { isConnectedMiddleware } from "../middlewares";
// import { isConnectedMiddleware } from "../middlewares"; // Désactiver temporairement

const productRouter = express.Router();

productRouter
  .get("/", productController.findAll)
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
