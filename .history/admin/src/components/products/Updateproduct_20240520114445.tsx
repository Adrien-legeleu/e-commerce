import { toast } from "react-toastify";
import { api } from "../../config/api";
import { ModalProduct } from "./ModalProduct";
import React from "react";
import { IProduct } from "../../types/product";

interface UpdateProps {
  closeUpdateModal: () => void;
  updateProduct: (productProperties: IProduct, productId: string) => void;
  recipeToEdit: IProduct;
}

export const UpdateProduct: React.FC<UpdateProps> = ({
  closeUpdateModal,
  updateProduct,
  recipeToEdit,
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

      api.patch(`/products/${recipeToEdit._id}`, dataProduct);
      updateProduct(dataProduct, recipeToEdit._id);
      toast.success("Product updated");
      closeUpdateModal();
    } catch (error: any) {
      console.log(error);
      toast.error("Error updating product");
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
        title: recipeToEdit?.title,
        desc: recipeToEdit?.desc,
        size: recipeToEdit?.size,
        color: recipeToEdit?.color,
        price: recipeToEdit?.price,
        imgUrl: recipeToEdit?.imgUrl,
        deliveryDate: recipeToEdit?.deliveryDate,
        qte: recipeToEdit?.qte,
        status: recipeToEdit?.status,
      }}
    />
  );
};
