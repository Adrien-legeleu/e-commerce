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
      updateProduct(response?.data, re);
      toast.success("Product created");
      closeUpdateModal();
      toast.success("Product created");
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
        price: undefined,
        imgUrl: "",
        deliveryDate: undefined,
        qte: undefined,
        status: undefined,
      }}
    />
  );
};
