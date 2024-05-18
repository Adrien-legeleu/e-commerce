import React, { useEffect, useState } from "react";
import { api } from "../config/api";
import { IProduct } from "../types/product";

export const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<IProduct[]>("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="h-full grid grid-cols-4 gap-10 px-8 items-center justify-center py-32">
      {products.map((product) => (
        <div
          key={`products  id: ${product._id} `}
          className="bg-slate-200 rounded-3xl flex flex-col h-80 justify-between gap-5 py-5 px-8"
        >
          <h2 className="text-center">{product.title}</h2>
          <img
            className="flex-1 bg-blue-100"
            src={product.imgUrl}
            alt={product.title}
          />
          <p className="text-center">{product.desc}</p>
          <p className="text-center">Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};
