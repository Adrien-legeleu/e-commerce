import { Route, Routes } from "react-router-dom";
import { Auth, Home } from "../Pages";
import { useAdminContext } from "../contexts/userContext";
import { ProductDetails } from "../components/products";

export const Router = () => {
  const { isAuthenticated } = useAdminContext();

  return isAuthenticated ? (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={ProductDetails} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path="*" element={<Auth />} />
    </Routes>
  );
};
