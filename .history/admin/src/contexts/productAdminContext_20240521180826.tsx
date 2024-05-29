// ProductContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";

// Création du contexte
const ProductContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useProductContext = () => useContext(ProductContext);

// Fournit les fonctions de gestion des produits via un Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const openUpdateModal = (product) => {
    setRecipeToEdit(product);
    setIsOpenUpdateModal(true);
  };

  const openCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const onAddProduct = (productProperties) => {
    setProducts((prev) => [...prev, productProperties]);
  };

  const updateProduct = async (productProperties, productId) => {
    try {
      // Code de mise à jour du produit...
      await api.put(`/products/${productId}`, productProperties);
      setProducts((prev) => {
        return prev.map((product) => {
          if (product._id === productId) {
            return { ...product, ...productProperties };
          }
          return product;
        });
      });
      toast.success("Product updated");
    } catch (error) {
      console.error(error);
      toast.error("Error: product not updated");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts((prev) => {
        return prev.filter((product) => productId !== product._id);
      });
      toast.success("Product deleted");
    } catch (error) {
      console.error(error);
      toast.error("Error: product not deleted");
    }
  };

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        deleteProduct,
        updateProduct,
        openUpdateModal,
        openCreateModal,
        isOpenCreateModal,
        isOpenUpdateModal,
        recipeToEdit,
        onAddProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
