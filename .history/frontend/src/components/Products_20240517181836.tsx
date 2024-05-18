import { useEffect, useState } from "react";
import { api } from "../config/api";

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async () => {
      const reponse = await api.get("/products");
      setProducts(reponse.data);
    };
  }, []);

  return (
    <div>
      {products.map((product, index) => {
        return (
          <div>
            <p>{product}</p>
          </div>
        );
      })}
    </div>
  );
};
