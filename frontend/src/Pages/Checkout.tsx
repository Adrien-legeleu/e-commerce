import { useEffect, useState } from "react";
import { Header, ModalCartCheckout } from "../components";
import { Input } from "../components/design/Input";
import { Label } from "../components/design/Label";
import ShimmerButton from "../components/design/ShimmerButton";
import { api } from "../config/api";
import { IProductCart } from "../types/productCart";
import BoxReveal from "../components/design/BoxReveal"; // Correct import path

export const Checkout = () => {
  const [productsCart, setproductsCart] = useState<IProductCart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [minDeliveryDate, setMinDeliveryDate] = useState<Date | null>(null);
  const [maxDeliveryDate, setMaxDeliveryDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProductsCart = async () => {
    try {
      const response = await api.get("/products/cart");
      setproductsCart(response.data);
    } catch (error) {
      console.log("error fetching products : " + error);
    }
  };

  useEffect(() => {
    getProductsCart();
  }, []);

  useEffect(() => {
    calculateTotalPrice(productsCart);
    calculateDeliveryDate(productsCart);
  }, [productsCart]);

  const calculateTotalPrice = (productsCart: IProductCart[]) => {
    const total = productsCart.reduce(
      (total, product) => total + product.price * product.qteToCart,
      0
    );
    setTotalPrice(total);
  };

  const calculateDeliveryDate = (productsCart: IProductCart[]) => {
    if (productsCart.length === 0) return;

    const deliveryDays = productsCart.map(
      (product: IProductCart) => product.deliveryDate
    );

    const minDays = Math.min(...deliveryDays);
    const maxDays = Math.max(...deliveryDays);

    const today = new Date();
    const newMinDeliveryDate = new Date(today);
    newMinDeliveryDate.setDate(today.getDate() + minDays);
    setMinDeliveryDate(newMinDeliveryDate);

    const newMaxDeliveryDate = new Date(today);
    newMaxDeliveryDate.setDate(today.getDate() + maxDays);
    setMaxDeliveryDate(newMaxDeliveryDate);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Header />
      <div className="grid grid-cols-63/37 px-16 pt-16 gap-12 font-montserrat">
        <div className="grid grid-cols-2 gap-8 max-h-[calc(100vh-200px)] relative pr-12">
          <div>
            <Label htmlFor="email">Votre nom</Label>
            <BoxReveal width={"100%"}>
              <Input id="email" placeholder="Lucas" type="email" required />
            </BoxReveal>
          </div>
          <div>
            <Label htmlFor="email">Votre email</Label>
            <BoxReveal width={"100%"}>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                required
              />
            </BoxReveal>
          </div>
          <div>
            <Label htmlFor="tel">Numéro de téléphone</Label>
            <BoxReveal width={"100%"}>
              <Input
                id="tel"
                placeholder="06 73 45 37 20"
                type="tel"
                required
              />
            </BoxReveal>
          </div>
          <div>
            <Label htmlFor="country">Pays</Label>
            <BoxReveal width={"100%"}>
              <Input id="country" placeholder="France" type="text" required />
            </BoxReveal>
          </div>
          <div>
            <Label htmlFor="city">Ville</Label>
            <BoxReveal width={"100%"}>
              <Input
                id="city"
                placeholder="projectmayhem@fc.com"
                type="text"
                required
              />
            </BoxReveal>
          </div>
          <div>
            <Label htmlFor="adress">Adresse (numéro et rue)</Label>
            <BoxReveal width={"100%"}>
              <Input
                id="adress"
                placeholder="15 rue de paris"
                type="text"
                required
              />
            </BoxReveal>
          </div>
          <div className="w-full">
            <Label htmlFor="postal">Code postale</Label>
            <BoxReveal width={"100%"}>
              <Input
                id="postal"
                placeholder="91120"
                type="text"
                required
                className="w-full"
              />
            </BoxReveal>
          </div>
        </div>
        <div className="w-full px-2 space-y-5">
          <div className="bg-white shadow-lg  py-8 space-y-5 px-6 rounded-2xl border-[#55555527] border-[1px] ">
            <div className="flex gap-4 flex-col">
              <div className="flex justify-between border-b-[1px] border-[#6b72801e] pb-5">
                <h6 className="text-[#6b7280] text-lg">Total</h6>
                <p className="font-semibold">{totalPrice} $</p>
              </div>
              <div className="flex justify-between items-center border-b-[1px] border-[#6b72801e] pb-5">
                <h6 className="text-[#6b7280] text-lg">Prix de la livraison</h6>
                <p className="font-semibold">
                  {productsCart.length > 0 ? "5,00 $" : "0 $"}
                </p>
              </div>
              <div className="flex justify-between items-center pb-5 border-b-[1px] border-[#6b72801e]">
                <h6 className="text-[#6b7280] text-lg">Livraison</h6>
                <p className="font-medium">
                  {minDeliveryDate
                    ? minDeliveryDate.toLocaleDateString()
                    : "N/A"}{" "}
                  -{" "}
                  {maxDeliveryDate
                    ? maxDeliveryDate.toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="flex justify-between pb-5">
                <h6 className="text-xl font-semibold">Total de la commande</h6>
                <p className="font-semibold text-lg">{totalPrice + 5} $</p>
              </div>
            </div>
            <div className="z-10 flex items-center justify-center">
              <ShimmerButton className="shadow-2xl hover:translate-x-1 ease-in-out">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-md xl:text-lg">
                  Commander
                </span>
              </ShimmerButton>
            </div>
          </div>
          <div className="bg-white shadow-lg  py-5 space-y-5 px-6 rounded-2xl border-[#55555527] border-[1px] font-medium text-center text-lg capitalize text-blackGray">
            <h3 className="pb-2">Votre commande</h3>
            {productsCart.map((product, index) =>
              index < 3 ? (
                <div
                  key={`product-to-cart-number-${index}`}
                  className="flex border-b-[2px] py-2 border-[#6b728011] h-20 relative"
                >
                  <div className="h-full">
                    <img
                      src={product.imgUrl}
                      className="rounded-md shadow-xl h-full aspect-[4/5] object-cover"
                      alt={`img de ${product.title}`}
                    />
                  </div>
                  <div className="relative left-5 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h1 className="text-sm">{product.title}</h1>
                      <div className="flex gap-5 text-[#6B7280] text-[0.8rem]">
                        <p>{product.color}</p>
                        <p>{product.size}</p>
                        <p className="font-semibold">${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                index === 3 && (
                  <div
                    key={`product-to-cart-number-${index}`}
                    className="bg-gray p-5 rounded-2xl w-12 h-12 flex items-center justify-center m-auto mt-5 hover:scale-105 ease-in-out cursor-pointer duration-150"
                    onClick={handleModal}
                  >
                    <h4 className="text-xl text-center font-semibold">
                      {productsCart.length - 3}+
                    </h4>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>

      <ModalCartCheckout
        productsCart={productsCart}
        handleModal={handleModal}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};
