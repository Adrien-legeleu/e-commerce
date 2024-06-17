import { useEffect, useState } from "react";
import { api } from "../config/api";
import { ICartOrder } from "../types/CartOrder";
import { Header } from "../components/header";
import { cn } from "../utils/cn";
import DotPattern from "../components/design/DotBg";
import LetterPullup from "../components/design/LetterPullup";
import { Check } from "lucide-react";

export const CartOrder = () => {
  const [orders, setOrders] = useState<ICartOrder[]>([]);

  const [showOrder, setShowOrder] = useState<ICartOrder>();

  const getOrder = async () => {
    try {
      const response = await api.get("/order");
      setOrders(response.data);
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const ShowOrder = (order: ICartOrder) => {
    setShowOrder(order);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="grid grid-cols-40/60 font-montserrat">
        <div
          className="border-r-2 flex flex-col gap-20  items-center py-12 h-[80vh] overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          <LetterPullup
            words="Vos Commandes"
            className="text-2xl font-medium  text-blackGray uppercase"
          />
          {showOrder && (
            <div className="px-10">
              <h2 className="uppercase text-blackGray text-center font-medium">
                CMD : <span> {showOrder?.userId}</span>
              </h2>
              <div className="grid-cols-2 gap-5 grid mt-10 text-blackGray">
                <p>{showOrder?.name}</p>
                <p>{showOrder?.tel}</p>
                <p>{showOrder?.country}</p>
                <p>{showOrder?.city}</p>
                <p>{showOrder?.adress}</p>
                <p>{showOrder?.zipCode}</p>
                <p>{showOrder?.email}</p>
              </div>
              <div className="my-10 w-1/2 h-[1px] rounded-full m-auto bg-blackGray"></div>
              <div>
                <p>total de la commande : {showOrder?.price} € </p>
                <p>taxe : 5 € </p>
              </div>
              <div className="my-10 w-1/2 h-[1.5px]  rounded-full m-auto bg-blackGray"></div>
              <div className="space-y-4">
                {showOrder.cartOrder.map((order, index) => {
                  return (
                    <div
                      className="hover:scale-105 w-full space-y-5 h-48 relative grid grid-cols-40/60 z-10 duration-200"
                      key={index}
                    >
                      <div className="w-full h-48 p-5">
                        <img
                          src={order.imgUrl}
                          className="rounded-3xl  aspect-[4/5] shadow-xl h-full w-full"
                          alt={`img de ${order.title}`}
                        />
                      </div>
                      <div className=" relative left-5 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div>
                            <div>
                              <h1 className="text-xl text-blackGray font-medium">
                                {order.title}
                              </h1>
                              <h2 className="text-blackGray font-medium">
                                {order.brand}
                              </h2>
                            </div>
                            <h2 className="text-blackGray font-medium">
                              {order.brand}
                            </h2>
                          </div>
                          <div className="flex gap-5 text-[#6B7280]">
                            <p>{order.color}</p>
                            <p>{order.size}</p>
                          </div>
                          <p className="font-semibold">${order.price}</p>
                        </div>
                        <div>
                          <p className="flex gap-1">
                            <Check color="#599400" />
                            {order.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="grid  grid-cols-2 gap-10  overflow-y-scroll p-16 h-[80vh]  ">
          {orders.map((order, index) => {
            return (
              <div
                key={`order number : ${index}`}
                className={` shadow-2xl z-10 p-5 rounded-3xl cursor-pointer hover:scale-105 duration-300 ease-in-out ${
                  showOrder?.userId === order.userId
                    ? "bg-green-100"
                    : "bg-white"
                } `}
                onClick={() => ShowOrder(order)}
              >
                <h2 className="uppercase text-blackGray font-medium">
                  cmd : <span className="text-sm">{order.userId}</span>
                </h2>
                <div className="grid-cols-1 gap-1 grid mt-5 text-blackGray">
                  <p>{order.name}</p>
                  <p>{order.tel}</p>
                  <p>{order.country}</p>
                  <p>{order.city}</p>
                </div>
                <div className="my-7 w-1/2 h-[1px] m-auto bg-blackGray"></div>
                <div>
                  <p>prix : {order.price} € </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(100vh_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
};
