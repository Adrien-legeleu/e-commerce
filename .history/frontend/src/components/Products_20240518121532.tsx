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
    <div>
      {products.map((product) => (
        <div key={`products  id: ${product._id} `>
          <h2>{product.title}</h2>
          <p>{product.desc}</p>
          <p>Price: ${product.price}</p>
          <img src={product.imgUrl} alt={product.title} />
        </div>
      ))}
    </div>
  );
};
