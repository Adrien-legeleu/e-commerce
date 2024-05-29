import { useEffect, useState } from "react";
import { api } from "../../config/api";

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      product = await api.get("/products");
    };
  }, []);

  return (
    <div>
      {products.map((product, index) => {
        return <div key={`product number : ${index}`}>product</div>;
      })}
    </div>
  );
};
