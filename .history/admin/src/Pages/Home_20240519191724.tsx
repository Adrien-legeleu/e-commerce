import { useState } from "react";
import { Header } from "../components/header";
import { ModalProduct, Products } from "../components/products";

export const Home = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const OpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div>
      <Header />
      <div className="py-10 flex items-center justify-center">
        <button className="py-3 px-6 bg-slate-200 rounded-full">
          Create products
        </button>
      </div>
      <Products />
      <ModalProduct />
    </div>
  );
};
