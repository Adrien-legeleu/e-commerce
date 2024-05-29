import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/api";
import { IProduct } from "../../types/product";
import { Header } from "../header";

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  console.log(productId);

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
      <div className="h-screen">
        <Header />
        <div className="w-1/2 flex  m-auto">
          <div>
            <h1>{product?.title}</h1>
            <p>{product?.desc}</p>
            <p>Price: {product?.price} €</p>
            <p>Quantity: {product?.qte}</p>
          </div>
          <div>
            <img
              src="https://www.couturierparisien.fr/579-large_default/chemise-homme-casual-blanche.jpg"
              alt={product?.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
