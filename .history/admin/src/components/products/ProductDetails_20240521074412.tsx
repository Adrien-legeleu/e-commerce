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
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow bg-slate-500">
        <div className="w-1/2 flex relative bg-slate-500 h-full m-auto">
          <div className="flex-grow p-4">
            <h1>{product?.title}</h1>
            <p>{product?.desc}</p>
            <p>Price: {product?.price} €</p>
            <p>Quantity: {product?.qte}</p>
          </div>
          <div className="flex-shrink-0 bg-black">
            <img
              src="https://www.couturierparisien.fr/579-large_default/chemise-homme-casual-blanche.jpg"
              className="max-h-full object-contain"
              alt={product?.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
