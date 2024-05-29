import { toast } from "react-toastify";
import { api } from "../../config/api";
import { ModalProduct } from "./ModalProduct";
import React from "react";
import { IProduct } from "../../types/product";

interface UpdateProps {
  closeUpdateModal: () => void;
  updateProduct: (productProperties: IProduct, productId: string) => void;
  recipeToEdit: any;
}

export const UpdateProduct: React.FC<UpdateProps> = ({
  closeUpdateModal,
  updateProduct,
  recpeToEdit,
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
      const response = await api.post(
        `/product/${recpeToEdit._id}`,
        dataProduct
      );
      updateProduct(response?.data, recpeToEdit._id);
      toast.success("Product updated");
      closeUpdateModal();
    } catch (error: any) {
      console.log(error);
      toast.error("Error creating product");
    }
  };
  return (
    <ModalProduct
      closeModal={closeUpdateModal}
      onSaveProduct={onSaveProduct}
      title="Edit your Product"
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
        title: recpeToEdit?.title,
        desc: recpeToEdit?.desc,
        size: recpeToEdit?.size,
        color: recpeToEdit?.color,
        price: recpeToEdit?.price,
        imgUrl: recpeToEdit?.imgUrl,
        deliveryDate: recpeToEdit?.deliveryDate,
        qte: recpeToEdit?.qte,
        status: recpeToEdit?.status,
      }}
    />
  );
};
