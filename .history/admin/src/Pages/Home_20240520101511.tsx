import { useState } from "react";
import { Header } from "../components/header";
import { CreateProduct, Products, UpdateProduct } from "../components/products";
import { IProduct } from "../types/product";

export const Home = () => {
  return (
    <div>
      <Header />

      <Products />
    </div>
  );
};
