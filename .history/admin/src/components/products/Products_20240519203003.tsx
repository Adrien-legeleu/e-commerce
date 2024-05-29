import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { IProduct } from "../../types/product";

interface ProductsProps {
  openUpdateModal: () => void;
}

export const Products: React.FC<ProductsProps> = ({ openUpdateModal }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex gap-12">
      {products.map((product, index) => {
        return (
          <div key={`product number : ${index}`}>
            <h1>{product.title}</h1>
            <div>
              <img src={product.imgUrl} alt={`img :  ${product.title} `} />
            </div>
            <p>{product.desc}</p>
            <ul>
              <li>{product.size}</li>
              <li>{product.color}</li>
              <li>{product.price}</li>
              <li>{product.deliveryDate}</li>
            </ul>
            <div>
              <button
                onClick={openUpdateModal}
                className="bg-slate-100 py-3 px-7 rounded-full"
              >
                modifier
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
