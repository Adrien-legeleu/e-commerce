import { toast } from "react-toastify";
import { api } from "../../config/api";
import { ModalProduct } from "./ModalProduct";
import React from "react";
import { IProduct } from "../../types/product";

interface CreateProps {
  closeCreateModal: () => void;
  onAddProduct = (productProperties: IProduct)=> void
}

export const CreateProduct: React.FC<CreateProps> = ({ closeCreateModal , onAddProduct }) => {
  const onSaveProduct = async (dataProduct: Partial<IProduct>) => {
    try {
      const { title, desc, price, size, deliveryDate, color, imgUrl, qte } =
        dataProduct;

      if (
        !title ||
        !desc ||
        !price ||
        !size ||
        !deliveryDate ||
        !color ||
        !imgUrl ||
        !qte
      ) {
        throw new Error(
          "title or desscription or size or price or deliveryDate or color required"
        );
      }
      const newProduct = {
        title,
        desc,
        price,
        size,
        deliveryDate,
        color,
        qte,
        imgUrl,
      };
      const response = await api.post("/products", newProduct);
      toast.success("Product created");
      closeCreateModal();
    } catch (error: any) {
      console.log(error);
      toast.error("Error creating product");
    }
  };
  return (
    <ModalProduct
      closeModal={closeCreateModal}
      onSaveProduct={onSaveProduct}
      title="Your new Product"
      params={{
        title: true,
        desc: true,
        price: true,
        size: true,
        deliveryDate: true,
        color: true,
        imgUrl: true,
        qte: true,
      }}
      initialProductData={{
        title: "",
        desc: "",
        size: "",
        color: "",
        price: "",
        imgUrl: "",
        deliveryDate: "",
        qte: "",
        status: "",
      }}
    />
  );
};
