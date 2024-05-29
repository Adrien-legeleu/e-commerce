import { useState } from "react";
import { Header } from "../components/header";
import { CreateProduct, Products, UpdateProduct } from "../components/products";

export const Home = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpeUpdateModal, setIsOpenUpdateModal] = useState(false);

  const openUpdateModal = () => {
    setIsOpenUpdateModal(true);
  };

  const openCreateModal = () => {
    setIsOpenCreateModal(true);
  };
  const closeCreateModal = () => {
    setIsOpenCreateModal(false);
  };
  const closeUpdateModal = () => {
    setIsOpenUpdateModal(false);
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
      <Products openUpdateModal={openUpdateModal} />
      {isOpenCreateModal && <CreateProduct closeModal={closeCreateModal} />}
      {isOpeUpdateModal && <UpdateProduct closeModal={closeUpdateModal} />}
    </div>
  );
};
