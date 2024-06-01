import React, { useEffect, useState } from "react";
import { api } from "../config/api";
import { IProduct } from "../types/product";
import { FilterComponent } from "./FilterComponent";

interface IProductProps {
  sexe: string;
}

export const Products: React.FC<IProductProps> = ({ sexe }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
      setProductsFiltered(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <FilterComponent
        setProducts={setProducts}
        setProductsFiltered={setProductsFiltered}
        productsFiltered={productsFiltered}
      />
      <div className="h-full grid grid-cols-4 gap-10 px-8 items-center justify-center py-20">
        {sexe
          ? productsFiltered.map((product) => {
              if (
                product.sexe === sexe ||
                ((sexe === "Homme" || sexe === "Femme") &&
                  product.sexe === "Unisexe")
              ) {
                return (
                  <div
                    key={`product-id-${product._id}`}
                    className="rounded-3xl flex flex-col h-full justify-between gap-5 py-5 group hover:scale-105 duration-200"
                  >
                    <div className="relative group group-hover:shadow-2xl duration-200 rounded-3xl">
                      <img
                        className="rounded-3xl w-full"
                        src={product.imgUrl[0]}
                        alt={`img: ${product.title}`}
                      />
                      <div className="py-2 px-4 bg-[#FFFFFFC9] rounded-3xl absolute bottom-0 left-0 w-full translate-y-5 invisible group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 opacity-0 duration-300">
                        <ul className="flex gap-3 mt-4 whitespace-nowrap">
                          {product.color.slice(0, 3).map((color, index) => (
                            <li
                              className="min-w-9 min-h-6 rounded-full border-[1px] border-[#00000040]"
                              key={`color-${index}`}
                              style={{ backgroundColor: color }}
                            ></li>
                          ))}
                          {product.color.length > 3 && (
                            <li
                              className="min-w-8 min-h-6 rounded-full flex items-center justify-center text-[0.75rem] border-[1px] border-[#00000040]"
                              key="color-more"
                            >
                              + {product.color.length - 3}
                            </li>
                          )}
                        </ul>
                        <ul className="flex gap-3 mt-4">
                          {product.size.slice(0, 3).map((size, index) => (
                            <li
                              className="w-9 h-7 rounded-full border-[1px] text-[0.75rem] flex items-center justify-center border-[#00000040]"
                              key={`size-${index}`}
                            >
                              {size}
                            </li>
                          ))}
                          {product.size.length > 3 && (
                            <li
                              className="w-9 h-7 rounded-full border-[1px] text-[0.75rem] flex items-center justify-center border-[#00000040]"
                              key="size-more"
                            >
                              + {product.size.length - 3}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h2 className="text-left text-lg capitalize">
                          {product.title}
                        </h2>
                        <p className="text-left">{product.desc}</p>
                      </div>
                      <p className="text-left font-semibold text-lg">
                        <p>{product.sexe}</p>${product.price}
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            })
          : products.map((product) => (
              <div
                key={`product-id-${product._id}`}
                className="rounded-3xl flex flex-col h-full justify-between gap-5 py-5 group hover:scale-105 duration-200"
              >
                <div className="relative group group-hover:shadow-2xl duration-200 rounded-3xl">
                  <img
                    className="rounded-3xl w-full"
                    src={product.imgUrl[0]}
                    alt={`img: ${product.title}`}
                  />
                  <div className="py-2 px-4 bg-[#FFFFFFC9] rounded-3xl absolute bottom-0 left-0 w-full translate-y-5 invisible group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 opacity-0 duration-300">
                    <ul className="flex gap-3 mt-4 whitespace-nowrap">
                      {product.color.slice(0, 3).map((color, index) => (
                        <li
                          className="min-w-9 min-h-6 rounded-full border-[1px] border-[#00000040]"
                          key={`color-${index}`}
                          style={{ backgroundColor: color }}
                        ></li>
                      ))}
                      {product.color.length > 3 && (
                        <li
                          className="min-w-8 min-h-6 rounded-full flex items-center justify-center text-[0.75rem] border-[1px] border-[#00000040]"
                          key="color-more"
                        >
                          + {product.color.length - 3}
                        </li>
                      )}
                    </ul>
                    <ul className="flex gap-3 mt-4">
                      {product.size.slice(0, 3).map((size, index) => (
                        <li
                          className="w-9 h-7 rounded-full border-[1px] text-[0.75rem] flex items-center justify-center border-[#00000040]"
                          key={`size-${index}`}
                        >
                          {size}
                        </li>
                      ))}
                      {product.size.length > 3 && (
                        <li
                          className="w-9 h-7 rounded-full border-[1px] text-[0.75rem] flex items-center justify-center border-[#00000040]"
                          key="size-more"
                        >
                          + {product.size.length - 3}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <h2 className="text-left text-lg capitalize">
                      {product.title}
                    </h2>
                    <p className="text-left">{product.desc}</p>
                  </div>
                  <p>{product.sexe}</p>
                  <p className="text-left font-semibold text-lg">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
