import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IProduct } from "../types/product";
import { api } from "../config/api";
import { Header } from "../components";
import { IProductCart } from "../types/productCart";
import { Slider } from "../components/slider";
import { Collapse, CollapseProps } from "antd";
import { ChevronRight } from "lucide-react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { useHeaderContext } from "../contexts/HeaderContext";
import GradualSpacing from "../components/design/GradualSpacing";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [dataProductCart, setDataProductCart] = useState<Partial<IProductCart>>(
    {
      title: undefined,
      desc: undefined,
      size: undefined,
      color: undefined,
      qte: undefined,
      price: undefined,
      deliveryDate: undefined,
      imgUrl: undefined,
      status: undefined,
      sexe: undefined,
      isFavoris: undefined,
      favoris: undefined,
      isToCart: false,
      brand: undefined,
    }
  );
  const [triggerAddToCart, setTriggerAddToCart] = useState(false);

  const { getProductsCart, getProductsFavorites } = useHeaderContext();

  const onChangeDataValue = ({ key, value }: any) => {
    setDataProductCart((prev: any) => ({
      ...prev,
      [key]: value,
    }));

    console.log(dataProductCart);
  };

  const fetchProduct = async () => {
    try {
      const response = await api.get<IProduct>(`/products/${productId}`);
      setProduct(response.data);
      setDataProductCart({
        title: response.data?.title,
        desc: response.data?.desc,
        size: response.data?.size[0],
        color: response.data?.color[0],
        qte: response.data?.qte,
        qteToCart: 0,
        price: response.data?.price,
        deliveryDate: response.data?.deliveryDate[0],
        imgUrl: response.data?.imgUrl[0],
        status: response.data?.status,
        sexe: response.data?.sexe,
        isFavoris: response.data?.isFavoris,
        favoris: response.data?.favoris,
        isToCart: false,
        productId: response.data?._id,
        brand: response.data?.brand,
      });
    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger le produit.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (triggerAddToCart) {
      addToCart();
      setTriggerAddToCart(false);
    }
  }, [dataProductCart, triggerAddToCart]);

  const addToCart = async () => {
    try {
      toast.success("produit ajouté au panier");
      await api.post(`/products/cart`, dataProductCart);
      getProductsCart();
    } catch (error) {
      console.error("Error add product to cart :", error);
    }
  };

  if (!product) {
    return null;
  }

  const calculateDeliveryDate = (daysToAdd: any) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString(); // Format de la date locale
  };

  const getItems: (
    matter: string[],
    deliveryDate: number[],
    desc: string,
    sexe: string,
    typeClothe: string
  ) => CollapseProps["items"] = (
    matter,
    deliveryDate,
    desc,
    sexe,
    typeClothe
  ) => [
    {
      key: "1",
      label: "Matière et entretien",

      children: (
        <div className="px-5 text-sm">
          <div className="flex flex-col gap-2 mb-5">
            <p>
              <span className="font-semibold">Composition :</span>
            </p>
            <ul className="list-disc pl-5">
              {matter.map((matter, index) => (
                <li key={index}>{matter}</li>
              ))}
            </ul>
          </div>
          <p>
            <span className="font-semibold">Conseil d'entretien : </span> Lavage
            en machine à 30 °C, lavage textiles délicats
          </p>
        </div>
      ),
      style: { marginBottom: "10px" },
    },
    {
      key: "2",
      label: "Livraison",
      children: (
        <div className="text-sm px-5 ">
          <p>
            <span className="font-semibold">Livraison estimée entre : </span>
            <span>
              {calculateDeliveryDate(deliveryDate[0])} -{" "}
              {calculateDeliveryDate(deliveryDate[1])}
            </span>
          </p>
        </div>
      ),
      style: { marginBottom: "10px" },
    },
    {
      key: "3",
      label: "Description",
      children: (
        <div>
          <p className="text-sm px-5">{desc}</p>
          <ul className="text-sm list-disc px-5 capitalize pt-3">
            <li>Sexe : {sexe}</li>
            <li>Catégorie : {typeClothe}</li>
          </ul>
        </div>
      ),
      style: { marginBottom: "10px" },
    },
  ];

  const handleFavoriteToggle = async (
    productId: string,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;
    try {
      await api.patch(`/products/favoris/${productId}`, {
        action: newStatus,
      });

      getProductsFavorites();

      setProduct((prevProduct) => {
        if (!prevProduct) {
          return prevProduct;
        }

        if (prevProduct._id === productId) {
          return {
            ...prevProduct,
            isFavoris: newStatus,
            favoris: newStatus
              ? (prevProduct.favoris || 0) + 1
              : (prevProduct.favoris || 0) - 1,
          };
        }

        return prevProduct;
      });
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col pb-12 font-montserrat">
      <Header />
      <div className="grid-cols-55/45 grid relative py-12 px-24 gap-20">
        <div className="bg-[#000000D0] left-6 top-10 flex items-center justify-center w-12 h-8 absolute rounded-full">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.3em"
              height="1.3em"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="white"
                  d="M3.283 10.94a1.5 1.5 0 0 0 0 2.12l5.656 5.658a1.5 1.5 0 1 0 2.122-2.122L7.965 13.5H19.5a1.5 1.5 0 0 0 0-3H7.965l3.096-3.096a1.5 1.5 0 1 0-2.122-2.121z"
                />
              </g>
            </svg>
          </Link>
        </div>
        <Slider images={product.imgUrl} />
        <div className="w-full space-y-10">
          <div className="space-y-1">
            <h1 className="text-3xl t>ext-left capitalize font-semibold text-blackGray">
              <GradualSpacing text={product.title} />
            </h1>
            <h2 className="text-2xl text-gray">
              {" "}
              <GradualSpacing text={product.brand} />
            </h2>
            <p className="text-2xl font-semibold text-blackGray flex gap-1">
              <GradualSpacing text={product.price.toString()} />€
            </p>
          </div>
          <div className="space-y-6 pt-4">
            <ul className="flex gap-3 ">
              {product.color.map((color: string, index: number) => (
                <li
                  className={`w-10 h-7 rounded-full duration-200 cursor-pointer  ${
                    dataProductCart?.color == color
                      ? "border-[2px] border-[#00000085]"
                      : "border-[1px] border-[#00000040]"
                  }`}
                  key={index}
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    onChangeDataValue({ key: "color", value: color })
                  }
                ></li>
              ))}
            </ul>

            <ul className="flex gap-3 mt-4">
              {product.size.map((size: string, index: number) => (
                <li
                  className={`w-10 h-7 rounded-full  text-sm flex items-center justify-center cursor-pointer ${
                    dataProductCart?.size == size
                      ? "border-[2px] border-[#00000085]"
                      : "border-[1px] border-[#00000040]"
                  }`}
                  key={index}
                  onClick={() =>
                    onChangeDataValue({ key: "size", value: size })
                  }
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full gap-12">
            <button
              onClick={() => {
                onChangeDataValue({ key: "isToCart", value: true });
                onChangeDataValue({ key: "qteToCart", value: 1 });
                setTriggerAddToCart(true);
              }}
              className="bg-grayLight w-1/2 text-lg  font-normal tracking-wider text-center py-4 rounded-2xl hover:translate-x-2 duration-200 ease-in-out"
            >
              Ajouter au panier
            </button>

            <div
              className="cursor-pointer flex flex-row-reverse gap-2 items-center  z-10"
              onClick={() =>
                handleFavoriteToggle(product._id, product.isFavoris)
              }
            >
              {!product.isFavoris && (
                <lord-icon
                  src="https://cdn.lordicon.com/ohfmmfhn.json"
                  trigger="morph"
                  state="morph-slider"
                  colors="primary:#c71f16,secondary:#c71f16,quaternary:#c71f16"
                  style={{ width: "50px", height: "45px" }}
                ></lord-icon>
              )}

              {product.isFavoris && (
                <lord-icon
                  src="https://cdn.lordicon.com/ohfmmfhn.json"
                  trigger="morph"
                  state="morph-heart-broken"
                  colors="primary:#c71f16,secondary:#c71f16,quaternary:#c71f16"
                  style={{ width: "50px", height: "45px" }}
                ></lord-icon>
              )}
            </div>
          </div>
          <Collapse
            bordered={false}
            size="large"
            className="flex flex-col bg-white pr-10"
            expandIcon={({ isActive }) => (
              <ChevronRight
                style={{
                  transform: isActive ? "rotate(90deg)" : "rotate(0)",
                  transition: "transform 0.3s ease",
                }}
                width={20}
              />
            )}
            items={getItems(
              product.matter,
              product.deliveryDate,
              product.desc,
              product.sexe,
              product.typeClothe
            )}
          />
        </div>
      </div>
    </div>
  );
};
