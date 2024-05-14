import { AuthController } from "./auth.controller";
import { ProductController } from "./product.model";

const authController = new AuthController();
const productController = new ProductController();
export { authController, productController };
