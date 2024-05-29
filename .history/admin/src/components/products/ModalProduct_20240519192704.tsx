import React from "react";

interface ModalProps {
  closeModal: () => void;
}

export const ModalProduct: React.FC<ModalProps> = ({ closeModal }) => {
  return (
    <div>
      <div className="shadow-2xl bg-slate-50">
        <h1>Create a new product</h1>
        <form></form>
      </div>
    </div>
  );
};

const infoInputProducts = [
  "title",
  "desc",
  "size",
  "url-image",
  "color",
  "price",
  "deliveryDate",
];
