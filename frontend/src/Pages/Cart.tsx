import { useEffect, useState } from "react";
import { Header } from "../components";
import { IProduct } from "../types/product";
import { api } from "../config/api";
import { InputNumber } from "antd";
import { Trash2 } from "lucide-react";

export const Cart = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const response = await api.get("products");
      const productsToAdd: IProduct[] = response.data.filter(
        (product: any) => product.isToCart
      );

      if (productsToAdd.length > 0) {
        setProducts(productsToAdd);
        console.log(productsToAdd);
      }
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
      <div className="grid grid-cols-60/40  justify-center h-screen pt-20 px-12">
        <div>
          <h1 className="text-5xl text-center pb-12">Votre panier</h1>
          <div className="grid grid-cols-1 w-full gap-20 ">
            {products.map((product, index) => {
              return (
                <div
                  key={`product to cart number :  ${index} `}
                  className=" grid-cols-60/40 grid m-auto border-t-[2px] pt-10 border-[#6b72801e] "
                >
                  <div className="flex ">
                    <div className="flex-1">
                      <img
                        src={product.imgUrl[0]}
                        className=" rounded-3xl"
                        alt={`img de ${product.title}`}
                      />
                    </div>
                    <div className="flex-1 relative left-5 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h1>{product.title}</h1>
                        <div className="flex gap-5 text-[#6B7280]">
                          <p>{product.color[0]}</p>
                          <p>{product.size[0]}</p>
                        </div>
                        <p className="font-semibold">${product.price}</p>
                      </div>
                      <div>
                        <p>{product.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start gap-12 items-end">
                    <InputNumber min={1} max={product.qte} changeOnWheel />
                    <Trash2 />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>total</div>
      </div>
    </div>
  );
};
