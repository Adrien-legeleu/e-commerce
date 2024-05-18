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
    <div className="h-full grid grid-cols-4 gap-10">
      {products.map((product) => (
        <div
          key={`products  id: ${product._id} `}
          className="bg-slate-50 rounded-3xl flex flex-col h-32 gap-5"
        >
          <h2>{product.title}</h2>
          <p>{product.desc}</p>
          <p>Price: ${product.price}</p>
          <img src={product.imgUrl} alt={product.title} />
        </div>
      ))}
    </div>
  );
};
