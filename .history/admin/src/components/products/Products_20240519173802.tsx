import { useEffect, useState } from "react";
import { api } from "../../config/api";

export const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product, index) => {
        return (
          <div key={`product number : ${index}`}>
            <h1>{product.title}</h1>
          </div>
        );
      })}
    </div>
  );
};
