import { createContext, ReactNode, useContext } from "react"; // Import from "react"
import { IProduct } from "../types/product";
import { useEffect, useState } from "react";
import { api } from "../config/api";
import { IProductCart } from "../types/productCart";

interface HeaderContextProps {
  productsToCart: IProductCart[];
  favorisNbr: number;
  getProductsCart: () => void;
  getProductsFavorites: () => void;
}

export const HeaderContext = createContext<HeaderContextProps>({
  productsToCart: [],
  favorisNbr: 0,
  getProductsCart: () => {},
  getProductsFavorites: () => {},
});

export const HeaderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsToCart, setProductsToCart] = useState<IProductCart[]>([]);
  const [favorisNbr, setFavorisNbr] = useState(0);

  const getProductsFavorites = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductsCart = async () => {
    try {
      const response = await api.get<IProductCart[]>("products/cart");

      const productsToAdd: IProductCart[] = response.data.filter(
        (product: any) => product.isToCart
      );

      if (productsToAdd.length > 0) {
        setProductsToCart(productsToAdd);
      }
    } catch (error) {
      console.log("error get products : " + error);
    }
  };

  const getFavorisNbr = () => {
    let favorisNumber = 0;
    products.forEach((product) => {
      if (product.isFavoris) {
        favorisNumber += 1;
      }
    });
    setFavorisNbr(favorisNumber);
  };

  useEffect(() => {
    getProductsFavorites();
    getProductsCart();
  }, []);

  useEffect(() => {
    getFavorisNbr();
  }, [products]);

  return (
    <HeaderContext.Provider
      value={{
        productsToCart,
        favorisNbr,
        getProductsCart,
        getProductsFavorites,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  return useContext(HeaderContext);
};
