import { toast } from "react-toastify";
import { api } from "../../config/api";
import { ModalProduct } from "./ModalProduct";
import React from "react";
import { IProduct } from "../../types/product";

interface UpdateProps {
  closeUpdateModal: () => void;
  updateProduct: (productProperties: IProduct, productId: string) => void;
}

export const UpdateProduct: React.FC<UpdateProps> = ({
  closeUpdateModal,
  updateProduct,
}) => {
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
          "Title, description, size, price, delivery date, color, image URL, and quantity are required."
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
      onAddProduct(response?.data);
      toast.success("Product created");
      closeCreateModal();
      toast.success("Product created");
    } catch (error: any) {
      console.log(error);
      toast.error("Error creating product");
    }
  };
  return (
    <ModalProduct closeModal={closeUpdateModal} onSaveProduct={onSaveProduct} />
  );
};
