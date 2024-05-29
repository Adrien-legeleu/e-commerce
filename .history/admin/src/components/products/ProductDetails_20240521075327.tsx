import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/api";
import { IProduct } from "../../types/product";
import { Header } from "../header";

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get<IProduct>(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError("Impossible de charger le produit.");
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!product) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="grid grid-cols-2 h-96 bg-black">
        <div className="p-4">
          <h1 className="text-white text-2xl">{product.title}</h1>
          <p className="text-white">{product.desc}</p>
          <p className="text-white">Prix : {product.price} €</p>
          <p className="text-white">Quantité : {product.qte}</p>
        </div>
        <div className="h-full w-full">
          <img
            src={product.imageUrl}
            className="object-contain w-full h-full"
            alt={product.title}
          />
        </div>
      </div>
    </div>
  );
};
