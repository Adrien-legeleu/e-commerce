import React, { createContext, ReactNode, useContext, useState } from "react";
import { IProduct } from "../types/product";

interface ProductAdminContextProps {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  deleteProduct: (productId: string) => void;
  updateProduct: (
    productProperties: Partial<IProduct>,
    productId: string
  ) => void;
  openUpdateModal: (product: IProduct) => void;
  recipeToEdit: IProduct | null;
  isOpenUpdateModal: boolean;
  setIsOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductAdminContext = createContext<ProductAdminContextProps | undefined>(
  undefined
);

export const useProductAdminContext = () => {
  const context = useContext(ProductAdminContext);
  if (!context) {
    throw new Error(
      "useProductAdminContext must be used within a ProductAdminProvider"
    );
  }
  return context;
};

export const ProductAdminProvider: React.FC = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState<IProduct | null>(null);

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product._id !== productId));
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

  const openUpdateModal = (product: IProduct) => {
    setRecipeToEdit(product);
    setIsOpenUpdateModal(true);
  };

  return (
    <ProductAdminContext.Provider
      value={{
        products,
        setProducts,
        deleteProduct,
        updateProduct,
        openUpdateModal,
        recipeToEdit,
        isOpenUpdateModal,
        setIsOpenUpdateModal,
      }}
    >
      {children}
    </ProductAdminContext.Provider>
  );
};
