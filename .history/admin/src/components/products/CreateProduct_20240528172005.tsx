import { toast } from "react-toastify";
import { api } from "../../config/api";
import { ModalProduct } from "./ModalProduct";
import React from "react";
import { IProduct } from "../../types/product";

interface CreateProps {
  closeCreateModal: () => void;
  onAddProduct: (productProperties: IProduct) => void;
}

export const CreateProduct: React.FC<CreateProps> = ({
  closeCreateModal,
  onAddProduct,
}) => {
  const onSaveProduct = async (dataProduct: Partial<IProduct>) => {
    try {
      const {
        title,
        desc,
        price,
        size,
        deliveryDate,
        color,
        imgUrl,
        qte,
        sexe,
      } = dataProduct;

      if (
        !title ||
        !desc ||
        !price ||
        !size ||
        !deliveryDate ||
        !color ||
        !imgUrl ||
        !qte ||
        !sexe
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
    } catch (error: any) {
      console.log(error);
      toast.error("Error creating product");
    }
  };
  return (
    <ModalProduct
      closeModal={closeCreateModal}
      onSaveProduct={onSaveProduct}
      title="Your New Product"
      params={{
        title: true,
        desc: true,
        price: true,
        deliveryDate: true,
        imgUrl: true,
        color: true,
        size: true,
        qte: true,
      }}
      initialProductData={{
        title: "",
        desc: "",
        size: undefined,
        color: undefined,
        price: undefined,
        imgUrl: undefined,
        deliveryDate: undefined,
        qte: undefined,
        status: undefined,
      }}
    />
  );
};
