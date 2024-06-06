import { toast } from "react-toastify";
import { api } from "../../config/api";
import { ModalProduct } from "./ModalProduct";
import React from "react";
import { IProduct } from "../../types/product";
import { useProductAdminContext } from "../../contexts/productAdminContext";

interface UpdateProps {
  closeUpdateModal: () => void;
  recipeToEdit: IProduct;
}

export const UpdateProduct: React.FC<UpdateProps> = ({
  closeUpdateModal,
  recipeToEdit,
}) => {
  const { updateProduct } = useProductAdminContext();
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
        typeClothe,
        brand,
        matter,
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
        !sexe ||
        !typeClothe ||
        !brand ||
        !matter
      ) {
        throw new Error(
          "Title, description, size, price, delivery date, color, image URL, and quantity are required."
        );
      }
      api.patch(`/products/${recipeToEdit._id}`, dataProduct);
      updateProduct(dataProduct as IProduct, recipeToEdit._id);
      toast.success("Product updated");
      closeUpdateModal();
    } catch (error: any) {
      console.error("Error updating product:", error);
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
        imgUrl: true,
        qte: true,
        color: true,
        size: true,
        sexe: true,
        brand: true,
        typeClothe: true,
        matter: true,
        price: true,
        deliveryDate: true,
      }}
      initialProductData={{
        title: recipeToEdit?.title,
        desc: recipeToEdit?.desc,
        price: recipeToEdit?.price,
        imgUrl: recipeToEdit?.imgUrl,
        deliveryDate: recipeToEdit?.deliveryDate,
        qte: recipeToEdit?.qte,
        size: recipeToEdit?.size,
        color: recipeToEdit?.color,
        status: recipeToEdit?.status,
        sexe: recipeToEdit?.sexe,
        typeClothe: recipeToEdit?.typeClothe,
        brand: recipeToEdit?.brand,
        matter: recipeToEdit?.matter,
      }}
    />
  );
};
