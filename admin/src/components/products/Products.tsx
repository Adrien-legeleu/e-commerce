import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { IProduct } from "../../types/product";
import { CreateProduct } from "./CreateProduct";
import { Link } from "react-router-dom";
import { useProductAdminContext } from "../../contexts/productAdminContext";
import { UpdateProduct } from "./UpdateProduct";
import { FilterComponent } from "../Filter";

export const Products = () => {
  const {
    deleteProduct,
    openUpdateModal,
    setProducts,
    recipeToEdit,
    isOpenUpdateModal,
    products,
    setIsOpenUpdateModal,
  } = useProductAdminContext();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([]);

  const openCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const onAddProduct = (product: IProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  const getProducts = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
      setProductsFiltered(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col gap-12 font-montserrat">
      <FilterComponent
        setProducts={setProducts}
        setProductsFiltered={setProductsFiltered}
        productsFiltered={productsFiltered}
        openCreateModal={openCreateModal}
      />

      <div className="grid px-10 grid-cols-4 items-start justify-center gap-8">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col h-full  pb-4">
            <Link
              to={`/${product._id}`}
              className="flex flex-col justify-end h-full "
            >
              <div className="hover:scale-105 w-full space-y-5    cursor-pointer group duration-200">
                <div className="relative group group-hover:shadow-2xl duration-200 rounded-2xl">
                  <img
                    className="rounded-2xl w-full object-cover aspect-[7/8]"
                    src={product.imgUrl[0]}
                    alt={`img: ${product.title}`}
                  />
                  <div className="py-2 px-4 bg-[#FFFFFFC9] rounded-2xl absolute bottom-0 left-0 w-full translate-y-5 invisible group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 opacity-0 duration-300">
                    <ul className="flex gap-3 mt-4 whitespace-nowrap">
                      {product.color.map((color, index) => {
                        if (index < 3) {
                          return (
                            <li
                              className="min-w-9 min-h-6 rounded-full border-[1px] border-[#00000040]"
                              key={`color-${index}`}
                              style={{ backgroundColor: color }}
                            ></li>
                          );
                        }
                        if (index === 4) {
                          return (
                            <li
                              className="min-w-8 min-h-6 rounded-full flex items-center justify-center text-[0.75rem] border-[1px] border-[#00000040]"
                              key={`colors-remaining-${index}`}
                            >
                              + {product.color.length - 3}
                            </li>
                          );
                        }
                      })}
                    </ul>
                    <ul className="flex gap-3 mt-4">
                      {product.size.map((size, index) => {
                        if (index < 3) {
                          return (
                            <li
                              className="w-9 h-7 rounded-full border-[1px] text-[0.75rem] flex items-center justify-center border-[#00000040]"
                              key={`size-${index}`}
                            >
                              {size}
                            </li>
                          );
                        }
                        if (index === 4) {
                          return (
                            <li
                              className="w-9 h-7 rounded-full border-[1px] text-[0.75rem] flex items-center justify-center border-[#00000040]"
                              key={`sizes-remaining-${index}`}
                            >
                              + {product.size.length - 3}
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-left text font-semibold text-blackGray tracking-wide">
                      {product.title}
                    </h3>
                    <h4 className="text-left text-sm text-gray">
                      {product.brand}
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-ld font-semibold text-blackGray tracking-wider">
                      {product.price} €
                    </h4>
                  </div>
                </div>
                <button className="bg-grayLight rounded-xl py-3  w-full text-center hover:scale-105 duration-300 ease-in-out">
                  Voir plus de détails
                </button>
              </div>
            </Link>
            <div className="pt-6 flex items-center justify-end gap-6">
              <div
                onClick={() => openUpdateModal(product)}
                className="hover:scale-110 duration-150 cursor-pointer"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z" />
                  </g>
                </svg>
              </div>
              <div
                onClick={() => deleteProduct(product._id)}
                className="hover:scale-110 duration-150 cursor-pointer"
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
        ))}
      </div>

      {isOpenCreateModal && (
        <CreateProduct
          closeCreateModal={() => setIsOpenCreateModal(false)}
          onAddProduct={onAddProduct}
        />
      )}
      {isOpenUpdateModal && recipeToEdit && (
        <UpdateProduct
          closeUpdateModal={() => setIsOpenUpdateModal(false)}
          recipeToEdit={recipeToEdit}
        />
      )}
    </div>
  );
};
