import React, { useEffect, useState } from "react";
import { api } from "../config/api";
import { IProduct } from "../types/product";
import { Filter } from "./Filter";

export const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Filter products={products} setProducts={setProducts} />
      <div className="h-full grid grid-cols-4  gap-5 px-8 items-center justify-center py-32">
        {products.map((product) => (
          <div
            key={`products id: ${product._id}`}
            className="rounded-3xl flex flex-col h-full justify-between gap-5 py-5 px-8 group hover:scale-105 duration-200"
          >
            <div className="relative group group-hover:shadow-2xl duration-200 rounded-3xl">
              <img
                className="rounded-3xl w-full"
                src={product.imgUrl[0]}
                alt={`img: ${product.title}`}
              />
              <div className="py-2 px-4 bg-[#FFFFFFC9] rounded-3xl absolute bottom-0 left-0 w-full  translate-y-5 invisible  group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 opacity-0 duration-300">
                <ul className="flex gap-3 mt-4 whitespace-nowrap ">
                  {product.color.map((color: any, index: any) => {
                    if (index < 3) {
                      return (
                        <li
                          className={`min-w-9 min-h-6 rounded-full border-[1px] border-[#00000040]`}
                          key={`color : ${index}  `}
                          style={{ backgroundColor: color }}
                        ></li>
                      );
                    }
                    if (index === 4) {
                      return (
                        <li
                          className={`min-w-8 min-h-6 rounded-full flex items-center justify-center text-[0.75rem] border-[1px] border-[#00000040]`}
                          key={`couleurs restantes : ${index}  `}
                        >
                          + {product.color.length - 3}
                        </li>
                      );
                    }
                  })}
                </ul>
                <ul className="flex   gap-3 mt-4">
                  {product.size.map((size: any, index: any) => {
                    if (index < 3) {
                      return (
                        <li
                          className={`w-9 h-7 rounded-full border-[1px]  text-[0.75rem] flex items-center justify-center border-[#00000040]`}
                          key={`taille : ${index}  `}
                        >
                          {size}
                        </li>
                      );
                    }
                    if (index === 4) {
                      return (
                        <li
                          className={`w-9 h-7 rounded-full border-[1px]  text-[0.75rem] flex items-center justify-center border-[#00000040]`}
                          key={`taille : ${index}  `}
                        >
                          + {product.size.length - 3}
                        </li>
                      );
                    }
                  })}
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
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
