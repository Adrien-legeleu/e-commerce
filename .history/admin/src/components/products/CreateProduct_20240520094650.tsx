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
      const {title , desc , price , size , deliveryDate , color} = dataProduct

      if (!title || !desc || !price || !size || !deliveryDate || !color ||) {
        throw new Error("title or desscription or size or price or deliveryDate or color required");
        
      }
      const newProduct ={title , desc , price , size , deliveryDate , color}
      const response = await api.post("/products", newProduct);
      toast.success("Product created");
      closeCreateModal()
    } catch (error: any) {
      console.log(error);
      toast.error("Error creating product");
    }
  };
  return (
    <ModalProduct closeModal={closeCreateModal} createProduct={createProduct} />
  );
};
