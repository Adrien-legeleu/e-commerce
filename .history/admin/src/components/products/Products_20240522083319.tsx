import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { IProduct } from "../../types/product";
import { CreateProduct } from "./CreateProduct";
import { Link } from "react-router-dom";
import { useProductAdminContext } from "../../contexts/productAdminContext";
import { UpdateProduct } from "./UpdateProduct";

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

  const openCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const onAddProduct = (product: IProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (
    productProperties: Partial<IProduct>,
    productId: string
  ) => {
    setProducts((prev) => {
      return prev.map((product) => {
        if (product._id === productId) {
          return { ...product, ...productProperties };
        }
        return product;
      });
    });
  };

  const getProducts = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="py-10 flex items-center justify-center">
        <button
          className="py-3 px-6 bg-slate-200 rounded-full"
          onClick={openCreateModal}
        >
          Create Product
        </button>
      </div>

      <div className="grid px-20 grid-cols-4 items-start justify-center gap-16">
        {products.map((product) => (
          <div className="pb-4" key={product._id}>
            <Link to={`/${product._id}`}>
              <div className="hover:scale-105 cursor-pointer group duration-200">
                <div className="relative group group-hover:shadow-2xl duration-200 rounded-3xl">
                  <img
                    className="rounded-3xl w-full"
                    src="https://www.couturierparisien.fr/579-large_default/chemise-homme-casual-blanche.jpg"
                    alt={`img: ${product.title}`}
                  />
                  <div className="py-2 px-4 bg-[#FFFFFFC9] rounded-3xl absolute bottom-0 left-0 w-full  translate-y-5 invisible  group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 opacity-0 duration-300">
                    <ul className="flex gap-3 mt-4 whitespace-nowrap ">
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
                        if (index === 3) {
                          return (
                            <li
                              className="min-w-8 min-h-6 rounded-full flex items-center justify-center text-[0.75rem] border-[1px] border-[#00000040]"
                              key={`color-restants-${index}`}
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
                        if (index === 3) {
                          return (
                            <li
                              className="w-9 h-7 rounded-full border-[1px] text-[0.75rem] flex items-center justify-center border-[#00000040]"
                              key={`size-restants-${index}`}
                            >
                              + {product.size.length - 3}
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="text-center">{product.title}</h4>
                  <h5 className="text-center text-sm">{product.desc}</h5>
                  <ul className="mt-1">
                    <li className="text-red-600 text-left">
                      {product.price} €
                    </li>
                    <li>
                      en stock : <strong>{product.qte}</strong>
                    </li>
                    {product.deliveryDate < 8 && (
                      <li className="flex items-center ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            color="black"
                          >
                            <path d="M19.5 17.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-10 0a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0" />
                            <path d="M14.5 17.5h-5M2 4h10c1.414 0 2.121 0 2.56.44C15 4.878 15 5.585 15 7v8.5m.5-9h1.801c.83 0 1.245 0 1.589.195c.344.194.557.55.984 1.262l1.699 2.83c.212.354.318.532.373.728c.054.197.054.403.054.816V15c0 .935 0 1.402-.201 1.75a1.5 1.5 0 0 1-.549.549c-.348.201-.815.201-1.75.201M2 13v2c0 .935 0 1.402.201 1.75a1.5 1.5 0 0 0 .549.549c.348.201.815.201 1.75.201M2 7h6m-6 3h4" />
                          </g>
                        </svg>{" "}
                        livraison express
                      </li>
                    )}
                  </ul>
                </div>
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
                onClick={() => deleteProduct(product._id)} // Corrected function name
                className="hover:scale-110 duration-150 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28px"
                  height="28px"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="M24 0v24H0V0zM0 0h24v24H0z" />
                    <path
                      fill="black"
                      d="M16.5 4l-1-1h-7l-1 1H5v2h14V4zM6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpenCreateModal && <CreateProduct onAddProduct={onAddProduct} />}
      {isOpenUpdateModal && (
        <UpdateProduct
          productToEdit={recipeToEdit}
          updateProduct={updateProduct}
        />
      )}
    </div>
  );
};
