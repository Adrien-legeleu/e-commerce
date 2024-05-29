import { createContext, ReactNode } from "react";

export const ProductADminContext = createContext({});

export const ProductAdminContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recipeToEdit, setRecipeToEdit] = useState<IProduct | null>(null);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
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
    <ProductADminContext.Provider value={{}}>
      {children}
    </ProductADminContext.Provider>
  );
};
