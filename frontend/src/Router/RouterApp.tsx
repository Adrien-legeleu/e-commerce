import { Route, Routes } from "react-router-dom";
import {
  Cart,
  Checkout,
  Child,
  Favorites,
  Home,
  Men,
  ProductDetails,
  Women,
} from "../Pages";

export const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/women" element={<Women />} />
      <Route path="/men" element={<Men />} />
      <Route path="/child" element={<Child />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/:productId" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};
