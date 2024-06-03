import { useEffect, useState } from "react";
import { Header } from "../components";
import { IProduct } from "../types/product";
import { api } from "../config/api";

export const Cart = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const response = await api.get("products");
      response.data.map((product: any) => {
        if (product.isToCart) {
          setProducts((prev) => {
            return [...prev, product];
          });
          console.log(product);
        }
      });
    } catch (error) {
      console.log("error get products : " + error);
    }
  };

  useEffect(() => {
    getProducts();
    console.log(products);
  }, []);

  return (
    <div>
      <Header />
      {/* <div>
        <div>
          {products.map((product, index) => {
            return (
              <div key={`product to cart number :  ${index} `}>
                <h1>{product.title}</h1>
                <p>{product.desc}</p>
              </div>
            );
          })}
        </div>
        <div>total</div>
      </div> */}
    </div>
  );
};
