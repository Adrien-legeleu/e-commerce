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
      <div className="flex flex-row-reverse  w-2/3 h-1//5 m-auto">
        <div className="">
          <div>
            <h1 className=" text-4xl capitalize">{product.title}</h1>
            <p className="text-2xl">{product.desc}</p>
          </div>
          <p className="text-red-700 text-xl">Prix : {product.price} €</p>
          <p className="">Quantité : {product.qte}</p>
        </div>
        <div>
          <img
            className="w-1/2 rounded-3xl"
            src="https://www.couturierparisien.fr/579-large_default/chemise-homme-casual-blanche.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
