import { useEffect, useState } from "react";
import { api } from "../../config/api";

export const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
    } catch (error) {
      console.log(ERROR);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product, index) => {
        return <div key={`product number : ${index}`}>product</div>;
      })}
    </div>
  );
};
