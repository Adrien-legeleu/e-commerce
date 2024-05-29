import { createContext, ReactNode, useState } from "react";
import { IProduct } from "../types/product";
import { toast } from "react-toastify";
import { api } from "../config/api";

export const ProductADminContext = createContext({
  products: [],
  recipeToEdit: null,
  isOpenCreateModal: false,
  isOpenUpdateModal: false,
  openUpdateModal: (product: IProduct) => {},
  deleteProduct: async (productId: string) => {},
});

export const ProductAdminContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [recipeToEdit, setRecipeToEdit] = useState<IProduct | null>(null);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const openUpdateModal = (product: IProduct) => {
    setRecipeToEdit(product);
    setIsOpenUpdateModal(true);
  };

  const deleteProduct = async (productId: string) => {
    // Corrected function name
    try {
      await api.delete(`/products/${productId}`);
      setProducts((prev) => {
        return prev.filter((product: IProduct) => productId !== product._id);
      });
      toast.success("Product deleted");
    } catch (error: any) {
      console.error(error);
      toast.error("Error: product not deleted");
    }
  };

  return (
    <ProductADminContext.Provider
      value={{
        deleteProduct,
        openUpdateModal,
        isOpenCreateModal,
        isOpenUpdateModal,
      }}
    >
      {children}
    </ProductADminContext.Provider>
  );
};
