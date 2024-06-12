import { useEffect, useState } from "react";
import { Header } from "../components";
import { api } from "../config/api";
import { InputNumber } from "antd";
import { Check, Trash2 } from "lucide-react";
import { IProductCart } from "../types/productCart";
import { Link } from "react-router-dom";
import { useHeaderContext } from "../contexts/HeaderContext";
import { toast } from "react-toastify";
import GradualSpacing from "../components/design/GradualSpacing";

export const Cart = () => {
  const [products, setProducts] = useState<IProductCart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [minDeliveryDate, setMinDeliveryDate] = useState<Date | null>(null);
  const [maxDeliveryDate, setMaxDeliveryDate] = useState<Date | null>(null);

  const { getProductsCart } = useHeaderContext();

  const getProducts = async () => {
    try {
      const response = await api.get<IProductCart[]>("products/cart");
      const productsToAdd: IProductCart[] = response.data.filter(
        (product: any) => product.isToCart
      );
      setProducts(productsToAdd);
      calculateDeliveryDate(productsToAdd); // Calculate delivery dates here
      calculateTotalPrice(productsToAdd); // Calculate total price here
    } catch (error) {
      console.log("error get products : " + error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const calculateTotalPrice = (products: IProductCart[]) => {
    const total = products.reduce(
      (total, product) => total + product.price * product.qteToCart,
      0
    );
    setTotalPrice(total);
  };

  const calculateDeliveryDate = (products: IProductCart[]) => {
    if (products.length === 0) return;

    const deliveryDays = products.map(
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

  useEffect(() => {
    getProductsCart();
    calculateTotalPrice(products);
    calculateDeliveryDate(products);
  }, [products]);

  const changeQteToCart = async (
    value: number | null,
    productCartId: string
  ) => {
    try {
      await api.patch(`/products/cart/${productCartId}`, {
        qteToCart: value,
      });

      if (value) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productCartId
              ? { ...product, qteToCart: value }
              : product
          )
        );
      }
    } catch (error) {
      console.log("Error updating quantity: ", error);
    }
  };

  const deleteProductcart = async (productCartId: string) => {
    try {
      setProducts((prevProducts) => {
        return prevProducts.filter((product) => product._id !== productCartId);
      });
      await api.delete(`products/cart/${productCartId}`);

      toast.success("Produit retiré du panier");
    } catch (error) {
      console.log("Error deleting productCart: ", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="grid grid-cols-60/40 justify-center h-screen pt-20 pl-12">
        <div>
          <h1 className="text-5xl text-center pb-12">Votre panier</h1>
          <div className="grid grid-cols-1 w-full gap-12">
            {products.map((product, index) => (
              <div
                key={`product-to-cart-number-${index}`}
                className="grid-cols-60/40 grid m-auto border-t-[2px] pt-10 border-[#6b72801e]"
              >
                <Link to={`/${product.productId}`}>
                  <div className="flex">
                    <div className="flex-1">
                      <img
                        src={product.imgUrl}
                        className="rounded-3xl shadow-xl"
                        alt={`img de ${product.title}`}
                      />
                    </div>
                    <div className="flex-1 relative left-5 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h1>{product.title}</h1>
                        <div className="flex gap-5 text-[#6B7280]">
                          <p>{product.color}</p>
                          <p>{product.size}</p>
                        </div>
                        <p className="font-semibold">${product.price}</p>
                      </div>
                      <div>
                        <p className="flex gap-1">
                          <Check color="#599400" />
                          {product.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-start gap-12 items-end">
                  <InputNumber
                    min={1}
                    max={product.qte}
                    defaultValue={product.qteToCart}
                    changeOnWheel
                    onChange={(value) => changeQteToCart(value, product._id)}
                  />
                  <Trash2
                    className="cursor-pointer"
                    onClick={() => deleteProductcart(product._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full px-12">
          <div className="bg-[#F9FAFB] py-8 px-5 rounded-3xl">
            <h2 className="text-2xl">
              <GradualSpacing text="Résumé de la commande" />
            </h2>
            <div className="flex gap-4 flex-col my-6">
              <div className="flex justify-between border-b-[1px] border-[#6b72801e] pb-5">
                <h6 className="text-[#6b7280] text-lg">
                  <GradualSpacing text="Total" />
                </h6>
                <p className="font-semibold">{totalPrice} $</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-[#6b72801e] pb-5">
                <h6 className="text-[#6b7280] text-lg">
                  <GradualSpacing text="Prix de la livraison" />
                </h6>
                <p className="font-semibold">
                  {products.length > 0 ? "5,00 $" : "0 $"}
                </p>
              </div>
              <div className="flex justify-between pb-5 border-b-[1px] border-[#6b72801e]">
                <h6 className="text-[#6b7280] text-lg">
                  <GradualSpacing text="Livraison" />
                </h6>
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
            <Link to="/checkout">
              <button className="bg-[#4F46E5] py-4 text-lg text-white font-semibold w-full rounded-2xl">
                Passer la commande
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
