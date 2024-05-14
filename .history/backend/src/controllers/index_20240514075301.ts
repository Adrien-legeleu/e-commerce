import { AuthController } from "./auth.controller";
import { ProductController } from "./product.controller";

const authController = new AuthController();
const productController = new ProductController();
export { authController, productController };
