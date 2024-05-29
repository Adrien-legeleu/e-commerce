import React, { useEffect, useState } from "react";
import { api } from "../config/api";
import { IProduct } from "../types/product";

export const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-full grid grid-cols-4  gap-10 px-8 items-center justify-center py-32">
      {products.map((product) => (
        <div
          key={`products  id: ${product._id} `}
          className="rounded-3xl flex flex-col h-full justify-between gap-5 py-5 px-8 group hover:scale-105 duration-200"
        >
          <img
            className="rounded-3xl group-hover:shadow-2xl  duration-300"
            src={product.imgUrl}
            alt={product.title}
          />
          <div className="space-y-2">
            <div className="space-y-2  justify-start  ">
              <h2 className="text-center text-xl capitalize">
                {product.title}
              </h2>
              <p className="text-center">{product.desc}</p>
            </div>
            <p className="text-left font-semibold text-lg">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
