import express from "express";
import { productController } from "../controllers";
// import { isConnectedMiddleware } from "../middlewares"; // Désactiver temporairement

const productRouter = express.Router();

productRouter
  .get("/", productController.findAll) // Retirer isConnectedMiddleware.execute
  .get("/:productId", productController.findOneById) // Retirer isConnectedMiddleware.execute
  .post("/", productController.create) // Retirer isConnectedMiddleware.execute
  .patch("/:productId", productController.updateOneById) // Retirer isConnectedMiddleware.execute
  .delete("/:productId", productController.deleteOneById); // Retirer isConnectedMiddleware.execute

export default productRouter;
