import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IProduct } from "../types/product";
import { api } from "../config/api";
import { Header } from "../components";
import { IProductCart } from "../types/productCart";

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
    }
  );
  const [triggerAddToCart, setTriggerAddToCart] = useState(false);

  const onChangeDataValue = ({ key, value }: any) => {
    console.log(dataProductCart);

    setDataProductCart((prev: any) => ({
      ...prev,
      [key]: value,
    }));
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
        deliveryDate: response.data?.deliveryDate,
        imgUrl: response.data?.imgUrl[0],
        status: response.data?.status,
        sexe: response.data?.sexe,
        isFavoris: response.data?.isFavoris,
        favoris: response.data?.favoris,
        isToCart: false,
        productId: response.data?._id,
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
      await api.post(`/products/cart`, dataProductCart);
      toast.success("produit ajouté au panier");
    } catch (error) {
      console.error("Error add product to cart :", error);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="h-full w-full flex flex-col pb-12">
      <Header />
      <div className="flex flex-row-reverse w-3/5 pt-12 m-auto relative">
        <Link to="/">
          <div className="bg-[#000000D0] -left-40 top-10 flex items-center justify-center w-12 h-8 absolute rounded-full">
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
          </div>
        </Link>
        <div className="space-y-6 w-full pl-64">
          <div>
            <h1 className="text-4xl capitalize">{product.title}</h1>
            <p className="text-2xl">{product.desc}</p>
          </div>
          <p className="text-red-700 text-xl">Prix : {product.price} €</p>

          <p>
            Sexe : <span> {product.sexe}</span>{" "}
          </p>

          <div>
            <p className="capitalize">couleurs disponibles :</p>
            <ul className="flex gap-3 mt-4">
              {product.color.map((color: string, index: number) => (
                <li
                  className={`w-8 h-6 rounded-full duration-200 cursor-pointer  ${
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
          </div>
          <div>
            <p className="capitalize">tailles disponibles :</p>
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

          <div>
            <button
              onClick={() => {
                onChangeDataValue({ key: "isToCart", value: true });
                onChangeDataValue({ key: "qteToCart", value: 1 });
                setTriggerAddToCart(true);
              }}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
        <Carousel autoPlay interval={5000} transitionTime={500} infiniteLoop>
          {product.imgUrl.map((img, index) => (
            <div className="rounded-3xl border-none mx-2" key={index}>
              <img className="rounded-3xl" src={img} alt={`thumb ${index}`} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
