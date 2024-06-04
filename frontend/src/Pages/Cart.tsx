import { useEffect, useState } from "react";
import { Header } from "../components";
import { api } from "../config/api";
import { InputNumber } from "antd";
import { Trash2 } from "lucide-react";
import { IProductCart } from "../types/productCart";

export const Cart = () => {
  const [products, setProducts] = useState<IProductCart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getProducts = async () => {
    try {
      const response = await api.get<IProductCart[]>("products/cart");
      console.log(response);

      const productsToAdd: IProductCart[] = response.data.filter(
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
  }, []);

  const calculateTotalPrice = () => {
    const total = products.reduce((total, product) => total + product.price, 0);
    setTotalPrice(total);
  };
  //   const calculateDeliveryDate = () => {
  //     let minDate = products[0].deliveryDate;
  //     let maxDate;
  //     products.map((product) => {
  //       if (product.deliveryDate < minDate) {
  //         minDate += product.deliveryDate;
  //         const data = new Date.getDate-new Date + 3
  //       }
  //     });
  //   };

  useEffect(() => {
    calculateTotalPrice();
  }, [products]);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-60/40 justify-center h-screen pt-20 pl-12">
        <div>
          <h1 className="text-5xl text-center pb-12">Votre panier</h1>
          <div className="grid grid-cols-1 w-full gap-20">
            {products.map((product, index) => (
              <div
                key={`product-to-cart-number-${index}`}
                className="grid-cols-60/40 grid m-auto border-t-[2px] pt-10 border-[#6b72801e]"
              >
                <div className="flex">
                  <div className="flex-1">
                    <img
                      src={product.imgUrl[0]}
                      className="rounded-3xl"
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
            ))}
          </div>
        </div>
        <div className="w-full px-12">
          <div className="bg-[#F9FAFB] py-8 px-5 rounded-3xl">
            <h2 className="text-2xl">Résumé de la commande</h2>
            <div className="flex gap-4 flex-col my-6">
              <div className="flex justify-between border-b-[1px] border-[#6b72801e] pb-5">
                <h6 className="text-[#6b7280] text-lg">Total</h6>
                <p className="font-semibold">{totalPrice} $</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-[#6b72801e] pb-5">
                <h6 className="text-[#6b7280] text-lg">Prix de la livraison</h6>
                <p className="font-semibold">5,00 $</p>
              </div>
              <div className="flex justify-between pb-5 border-b-[1px] border-[#6b72801e]">
                <h6 className="text-[#6b7280] text-lg">date de livraison</h6>
                <p>24 mai 2024 - 12 juin 2024</p>
              </div>
              <div className="flex justify-between pb-5">
                <h6 className=" text-xl font-semibold">Total de la commande</h6>
                <p className="font-semibold text-lg">{totalPrice + 5} $</p>
              </div>
            </div>
            <button className="bg-[#4F46E5] py-4 text-center text-white w-full text-xl rounded-3xl">
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
