import { useEffect, useState } from "react";
import { api } from "../config/api";

export const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <h2>{product.title}</h2>
            <p>{product.desc}</p>
            <p>Price: ${product.price}</p>
            <img src={product.imgUrl} alt={product.title} />
          </div>
        );
      })}
    </div>
  );
};