import React, { createContext, ReactNode, useContext, useState } from "react";
import { IProduct } from "../types/product";
import { toast } from "react-toastify";
import { api } from "../config/api";

interface ProductAdminContextProps {
  products: IProduct[];
  recipeToEdit: IProduct | null;
  isOpenUpdateModal: boolean;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setIsOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  openUpdateModal: (product: IProduct) => void;
  deleteProduct: (productId: string) => Promise<void>;
  updateProduct: (
    productProperties: Partial<IProduct>,
    productId: string
  ) => any;
}

export const ProductAdminContext = createContext<ProductAdminContextProps>({
  products: [],
  recipeToEdit: null,
  isOpenUpdateModal: false,
  setProducts: () => {},
  setIsOpenUpdateModal: () => {},
  openUpdateModal: () => {},
  deleteProduct: async () => {},
  updateProduct: async () => {},
});

export const ProductAdminContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [recipeToEdit, setRecipeToEdit] = useState<IProduct | null>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const openUpdateModal = (product: IProduct) => {
    setRecipeToEdit(product);
    setIsOpenUpdateModal(true);
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

  const deleteProduct = async (productId: string) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
      toast.success("Product deleted");
    } catch (error) {
      console.error(error);
      toast.error("Error: product not deleted");
    }
  };

  return (
    <ProductAdminContext.Provider
      value={{
        deleteProduct,
        openUpdateModal,
        setProducts,
        products,
        recipeToEdit,
        isOpenUpdateModal,
        setIsOpenUpdateModal,
        updateProduct,
      }}
    >
      {children}
    </ProductAdminContext.Provider>
  );
};

export const useProductAdminContext = () => {
  return useContext(ProductAdminContext);
};
