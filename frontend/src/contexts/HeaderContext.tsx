import { createContext, ReactNode, useContext } from "react"; // Import from "react"
import { IProduct } from "../types/product";
import { useEffect, useState } from "react";
import { api } from "../config/api";

interface HeaderContextProps {
  productsToCart: IProduct[];
  favorisNbr: number;
  getProductsCart: () => void;
}

export const HeaderContext = createContext<HeaderContextProps>({
  productsToCart: [],
  favorisNbr: 0,
  getProductsCart: () => {},
});

export const HeaderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsToCart, setProductsToCart] = useState<IProduct[]>([]);
  const [favorisNbr, setFavorisNbr] = useState(0);

  const getProducts = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductsCart = async () => {
    try {
      const response = await api.get<IProduct[]>("/products/cart");
      setProductsToCart(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
    getProducts();
    getProductsCart();
  }, []);

  useEffect(() => {
    getFavorisNbr();
  }, [products]);

  return (
    <HeaderContext.Provider
      value={{ productsToCart, favorisNbr, getProductsCart }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  return useContext(HeaderContext);
};
