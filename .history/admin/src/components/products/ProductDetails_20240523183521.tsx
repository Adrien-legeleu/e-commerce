import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../config/api";
import { IProduct } from "../../types/product";
import { Header } from "../header";
import { toast } from "react-toastify";
import { UpdateProduct } from "./UpdateProduct";
import { useProductAdminContext } from "../../contexts/productAdminContext";

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);

  const {
    deleteProduct,
    openUpdateModal,
    recipeToEdit,
    isOpenUpdateModal,
    setIsOpenUpdateModal,
  } = useProductAdminContext();

  const updateProduct = (
    productProperties: Partial<IProduct>,
    productId: string
  ) => {
    setProduct((prevProduct) => {
      if (prevProduct && prevProduct._id === productId) {
        return { ...prevProduct, ...productProperties };
      }
      return prevProduct;
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get<IProduct>(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger le produit.");
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="flex flex-row-reverse  w-3/5 m-auto relative">
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
          <p className="">Quantité : {product.qte}</p>
          <div>
            <p className="capitalize">couleurs disponibles :</p>
            <ul className="flex gap-3 mt-4">
              {product.color.map((color: any, index: any) => {
                return (
                  <li
                    className={`w-8 h-6 rounded-full border-[1px] border-[#00000040] `}
                    key={`color : ${index}  `}
                    style={{ backgroundColor: color }}
                  ></li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="capitalize">tailles disponibles :</p>
            <ul className="flex gap-3 mt-4">
              {product.size.map((size: any, index: any) => {
                return (
                  <li
                    className={`w-10 h-7 rounded-full border-[1px]  text-sm flex items-center justify-center border-[#00000040]`}
                    key={`taille : ${index}  `}
                  >
                    {size}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pt-6 flex items-center justify-end gap-6">
            <div
              className="hover:scale-110 duration-150 cursor-pointer"
              onClick={() => openUpdateModal(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z" />
                </g>
              </svg>
            </div>

            <div
              className="hover:scale-110 duration-150 cursor-pointer"
              onClick={() => deleteProduct(product._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="black"
                    d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07A1.017 1.017 0 0 1 5 7H4a1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-full rounded-3xl"
            src="https://www.couturierparisien.fr/579-large_default/chemise-homme-casual-blanche.jpg"
            alt=""
          />
        </div>
      </div>
      {isOpenUpdateModal && recipeToEdit && (
        <UpdateProduct
          closeUpdateModal={() => setIsOpenUpdateModal(false)}
          updateProduct={updateProduct}
          recipeToEdit={recipeToEdit}
        />
      )}
    </div>
  );
};
