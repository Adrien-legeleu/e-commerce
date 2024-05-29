import { toast } from "react-toastify";
import { api } from "../../config/api";
import { ModalProduct } from "./ModalProduct";
import React from "react";

interface UpdateProps {
  closeModal: () => void;
}

export const CreateProduct: React.FC<UpdateProps> = ({ closeModal }) => {
  const creatProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      const values = {
        title: data.get("title"),
        desc: data.get("desc"),
        size: data.get("size"),
        imgUrl: data.get("url-image"),
        color: data.get("color"),
        price: data.get("price"),
        deliveryDate: data.get("delivery-date"),
      };
      await api.post("/products", values);
      toast.success("Product created");
    } catch (error: any) {
      console.log(error);
      toast.error("Error creating product");
    }
  };
  return <ModalProduct closeModal={closeModal} createProduct={creatProduct} />;
};
