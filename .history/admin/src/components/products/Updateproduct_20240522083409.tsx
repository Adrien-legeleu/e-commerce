import { toast } from "react-toastify";
import { api } from "../../config/api";
import { ModalProduct } from "./ModalProduct";
import React from "react";
import { IProduct } from "../../types/product";

interface UpdateProps {
  closeUpdateModal: () => void;
  updateProduct: (productProperties: IProduct, productId: string) => void;
  productToEdit: IProduct;
}

export const UpdateProduct: React.FC<UpdateProps> = ({
  closeUpdateModal,
  updateProduct,
  productToEdit,
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

      api.patch(`/products/${productToEdit._id}`, dataProduct);
      updateProduct(dataProduct as IProduct, productToEdit._id);
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
        deliveryDate: true,
        imgUrl: true,
        qte: true,
        color: true,
        size: true,
        status: true,
      }}
      initialProductData={{
        title: productToEdit?.title,
        desc: productToEdit?.desc,
        price: productToEdit?.price,
        imgUrl: productToEdit?.imgUrl,
        deliveryDate: productToEdit?.deliveryDate,
        qte: productToEdit?.qte,
        size: productToEdit?.size,
        color: productToEdit?.color,
        status: productToEdit?.status,
      }}
    />
  );
};
