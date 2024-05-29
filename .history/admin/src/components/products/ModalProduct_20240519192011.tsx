import React from "react";

interface ModalProps {
  closeModal: () => void;
}

export const ModalProduct: React.FC<ModalProps> = ({ closeModal }) => {
  return (
    <div>
      <div>
        <h1>Create a new product</h1>
      </div>
    </div>
  );
};
