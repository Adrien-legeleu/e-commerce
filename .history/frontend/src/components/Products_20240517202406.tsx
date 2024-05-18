import { useEffect, useState } from "react";
import { api } from "../config/api";
import { IProduct } from "../types/product";

export const Products : React.FC = () => {
  const [products, setProducts] = useState<IProduct[([]);
  useEffect(() => {
    const fetchProducts = async () => {
      
        const response = await api.get("/products");
        setProducts(response.data);
    
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
