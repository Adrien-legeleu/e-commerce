import { Route, Routes } from "react-router-dom";
import { Auth, CartOrder, Home } from "../Pages";
import { useAdminContext } from "../contexts/userContext";
import { ProductDetails } from "../components/products";

export const Router = () => {
  const { isAuthenticated } = useAdminContext();

  return isAuthenticated ? (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:productId" element={<ProductDetails />} />
        <Route path="/order" element={<CartOrder />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path="*" element={<Auth />} />
    </Routes>
  );
};
