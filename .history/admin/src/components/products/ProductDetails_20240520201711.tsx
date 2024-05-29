// ProductDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/api";
import { IProduct } from "../../types/product";

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await api.get<IProduct>(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.desc}</p>
      <p>Price: {product.price} €</p>
      <p>Quantity: {product.qte}</p>
    </div>
  );
};
