import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();
const productController = new ProductController();

router.get("/products", productController.findAll.bind(productController));
router.get(
  "/products/:productId",
  productController.findOneById.bind(productController)
);
router.post("/products", productController.create.bind(productController));
router.put(
  "/products/:productId",
  productController.updateOneById.bind(productController)
);
router.delete(
  "/products/:productId",
  productController.deleteOneById.bind(productController)
);

export default router;
