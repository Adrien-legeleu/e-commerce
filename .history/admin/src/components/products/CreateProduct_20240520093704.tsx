import { toast } from "react-toastify";
import { api } from "../../config/api";
import { ModalProduct } from "./ModalProduct";
import React from "react";
import { IProduct } from "../../types/product";

interface CreateProps {
  closeCreateModal: () => void;
}

export const CreateProduct: React.FC<CreateProps> = ({ closeCreateModal }) => {
  const createProduct = async (dataProduct: Partial<IProduct>) => {
    try {
      const response = await api.post("/products", dataProducts);
      toast.success("Product created");
    } catch (error: any) {
      console.log(error);
      toast.error("Error creating product");
    }
  };
  return (
    <ModalProduct closeModal={closeCreateModal} createProduct={createProduct} />
  );
};
