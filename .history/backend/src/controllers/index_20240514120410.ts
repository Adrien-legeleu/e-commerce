import { AuthController } from "./auth.controller";
import { CartController } from "./cart.controller";
import { ProductController } from "./product.controller";

const authController = new AuthController();
const productController = new ProductController();
const cartController = new CartController();
export { authController, productController, cartController };
