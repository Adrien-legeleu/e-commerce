import { useEffect, useState } from "react";
import { Header } from "../components";
import { api } from "../config/api";
import { IProduct } from "../types/product";
import { Link } from "react-router-dom";
import { FilterComponent } from "../components/filter";

export const Favorites = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
      setProductsFiltered(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleFavoriteToggle = async (
    productId: string,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;
    try {
      await api.patch(`/products/favoris/${productId}`, {
        action: newStatus,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, isFavoris: newStatus }
            : product
        )
      );
      setProductsFiltered((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, isFavoris: newStatus }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div>
      <Header />
      <FilterComponent
        setProducts={setProducts}
        setProductsFiltered={setProductsFiltered}
        productsFiltered={productsFiltered}
      />
      <div className="h-full grid grid-cols-4 gap-10 px-8 items-center justify-center py-20">
        {" "}
        {products.map((product) => {
          if (product.isFavoris) {
            return (
              <div
                key={`product-id-${product._id}`}
                className="mb-10  h-full  group hover:scale-105 duration-200 relative"
              >
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
                      <div className="space-y-1">
                        <h3 className="text-left text font-semibold text-blackGray tracking-wide">
                          {product.title}
                        </h3>
                        <h4 className="text-left text-sm text-gray">
                          {product.brand}
                        </h4>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-ld font-semibold text-blackGray tracking-wider">
                          {product.price} €
                        </h4>

                        <div className="flex flex-row-reverse gap-2 items-center  z-10 cursor-default">
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              handleFavoriteToggle(
                                product._id,
                                product.isFavoris
                              )
                            }
                          >
                            {!product.isFavoris && (
                              <lord-icon
                                src="https://cdn.lordicon.com/ohfmmfhn.json"
                                trigger="morph"
                                state="morph-slider"
                                colors="primary:#c71f16,secondary:#c71f16,quaternary:#c71f16"
                                style={{ width: "50px", height: "30px" }}
                              ></lord-icon>
                            )}

                            {product.isFavoris && (
                              <lord-icon
                                src="https://cdn.lordicon.com/ohfmmfhn.json"
                                trigger="morph"
                                state="morph-heart-broken"
                                colors="primary:#c71f16,secondary:#c71f16,quaternary:#c71f16"
                                style={{ width: "50px", height: "30px" }}
                              ></lord-icon>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
