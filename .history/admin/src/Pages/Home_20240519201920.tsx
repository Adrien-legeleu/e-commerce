import { useState } from "react";
import { Header } from "../components/header";
import { ModalProduct, Products } from "../components/products";
import { CreateProduct } from "../components/products/CreateProduct";

export const Home = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const openCreateModal = () => {
    setIsOpenCreateModal(true);
  };
  const closeCreateModal = () => {
    setIsOpenCreateModal(false);
  };

  return (
    <div>
      <Header />
      <div className="py-10 flex items-center justify-center">
        <button
          className="py-3 px-6 bg-slate-200 rounded-full"
          onClick={openCreateModal}
        >
          Create products
        </button>
      </div>
      <Products />
      {isOpenCreateModal && <CreateProduct closeModal={closeCreateModal} />}
    </div>
  );
};
