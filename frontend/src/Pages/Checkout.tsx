import { useEffect, useState } from "react";
import { Header } from "../components";
import { Input } from "../components/design/Input";
import { Label } from "../components/design/Label";
import ShimmerButton from "../components/design/ShimmerButton";
import { api } from "../config/api";
import { IProductCart } from "../types/productCart";

export const Checkout = () => {
  const [productsCart, setproductsCart] = useState<IProductCart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [minDeliveryDate, setMinDeliveryDate] = useState<Date | null>(null);
  const [maxDeliveryDate, setMaxDeliveryDate] = useState<Date | null>(null);

  const getProductsCart = async () => {
    try {
      const response = await api.get("/products/cart");
      setproductsCart(response.data);
    } catch (error) {
      console.log("error fatching products : " + error);
    }
  };

  useEffect(() => {
    getProductsCart();
    calculateTotalPrice(productsCart);
    calculateDeliveryDate(productsCart);
  }, []);

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

  return (
    <div>
      <Header />
      <div className="grid grid-cols-63/37 px-12 pt-16 gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div className=" ">
            <Label htmlFor="email">Votre nom</Label>
            <Input id="email" placeholder="Lucas" type="email" required />
          </div>
          <div className="">
            <Label htmlFor="email">Votre email</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
            />
          </div>
          <div className="">
            <Label htmlFor="tel">Numéro de téléphone</Label>
            <Input id="tel" placeholder="06 73 45 37 20" type="tel" required />
          </div>
          <div className="">
            <Label htmlFor="country">Pays</Label>
            <Input id="country" placeholder="France" type="text" required />
          </div>
          <div className="">
            <Label htmlFor="city">Ville</Label>
            <Input
              id="city"
              placeholder="projectmayhem@fc.com"
              type="text"
              required
            />
          </div>
          <div className="">
            <Label htmlFor="adress">Adresse (numéro et rue)</Label>
            <Input
              id="adress"
              placeholder="15 rue de paris"
              type="text"
              required
            />
          </div>
          <div className="">
            <Label htmlFor="postal">Code postale</Label>
            <Input id="postal" placeholder="91120" type="text" required />
          </div>
        </div>
        <div className="w-full px-8">
          <div className="bg-[#F9FAFB] py-8 px-5 rounded-3xl">
            <h2 className="text-2xl">Résumé de la commande</h2>
            <div className="flex gap-4 flex-col my-6">
              <div className="flex justify-between border-b-[1px] border-[#6b72801e] pb-5">
                <h6 className="text-[#6b7280] text-lg">Total</h6>
                <p className="font-semibold">{totalPrice} $</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-[#6b72801e] pb-5">
                <h6 className="text-[#6b7280] text-lg">Prix de la livraison</h6>
                <p className="font-semibold">
                  {productsCart.length > 0 ? "5,00 $" : "0 $"}
                </p>
              </div>
              <div className="flex justify-between pb-5 border-b-[1px] border-[#6b72801e]">
                <h6 className="text-[#6b7280] text-lg">Date de livraison</h6>
                <p>
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
                <h6 className=" text-xl font-semibold">Total de la commande</h6>
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
        </div>
      </div>
    </div>
  );
};
