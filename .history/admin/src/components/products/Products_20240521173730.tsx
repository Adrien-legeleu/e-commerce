import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { IProduct } from "../../types/product";
import { CreateProduct } from "./CreateProduct";
import { UpdateProduct } from "./UpdateProduct"; // Correction du nom du composant
import { Link } from "react-router-dom";
import { useProductAdminContext } from "../../contexts/productAdminContext";

export const Products = () => {
  const {
    deleteProduct,
    openUpdateModal,
    setProducts,
    recipeToEdit,
    isOpenUpdateModal,
    products,
  } = useProductAdminContext();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const openCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const onAddProduct = (productProperties: IProduct) => {
    setProducts((prev) => [...prev, productProperties]);
  };

  const updateProduct = (
    productProperties: Partial<IProduct>,
    productId: string
  ) => {
    setProducts((prev) => {
      return prev.map((product) => {
        if (product._id === productId) {
          return { ...product, ...productProperties };
        }
        return product;
      });
    });
  };

  const getProducts = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="py-10 flex items-center justify-center">
        <button
          className="py-3 px-6 bg-slate-200 rounded-full"
          onClick={openCreateModal}
        >
          Create Product
        </button>
      </div>

      <div className="grid px-20 grid-cols-4 items-start justify-center gap-16">
        {products.map((product) => (
          <Link to={`/${product._id}`} key={product._id}>
            <div
              className="hover:scale-105 cursor-pointer group duration-200"
            >
              <div className="relative group group-hover:shadow-2xl duration-200 rounded-3xl">
                <img
                  className="rounded-3xl w-full"
                  src="https://www.couturierparisien.fr/579-large_default/chemise-homme-casual-blanche.jpg"
                  alt={`img: ${product.title}`}
                />
                <div className="py-4 px-5 bg-[#FFFFFFC9] rounded-3xl absolute bottom-0 left-0 w-full  translate-y-5 invisible  group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 opacity-0 duration-300">
                  <p>{product.color}</p>
                  <p>{product.size}</p>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-center text">{product.title}</h4>
                <h5 className="text-center text-sm">{product.desc}</h5>
                <ul className="mt-1">
                  <li className="text-red-600 text text-left">
                    {product.price} €
                  </li>
                  <li>
                    en stock : <strong>{product.qte}</strong>
                  </li>
                  {product.deliveryDate < 8 && (
                    <li className="flex items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
      
