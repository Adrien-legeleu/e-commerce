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
  const { updateProduct, updateProductDetails } = useProductAdminContext();
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
      updateProduct(dataProduct as IProduct, recipeToEdit._id);
      updateProductDetails(recipeToEdit._id, dataProduct);
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
        price: true,
        deliveryDate: true,
        color: true,
        imgUrl: true,
        qte: true,
        size: true,
        status: true,
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
      }}
    />
  );
};
