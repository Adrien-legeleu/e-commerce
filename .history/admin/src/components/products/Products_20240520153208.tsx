import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { IProduct } from "../../types/product";
import { CreateProduct } from "./CreateProduct";
import { UpdateProduct } from "./Updateproduct";
import { toast } from "react-toastify";

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [recipeToEdit, setRecipeToEdit] = useState<IProduct | null>(null);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const openUpdateModal = (product: IProduct) => {
    setRecipeToEdit(product);
    setIsOpenUpdateModal(true);
  };

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

  const deletePoduct = async (productId: string) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts((prev) => {
        return prev.filter((product: IProduct) => productId !== product._id);
      });
      toast.success("product deleted");
    } catch (error: any) {
      console.log(error);
      toast.error("error : product not deleted");
    }
  };

  const getProducts = async () => {
    try {
      const response = await api.get<IProduct[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
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
      <div className="grid px-20 grid-cols-4 items-center justify-center gap-16">
        {products.map((product, index) => (
          <div key={`product number : ${index}`} className="bg">
            <div>
              <img
                src="https://www.couturierparisien.fr/579-large_default/chemise-homme-casual-blanche.jpg"
                alt={`img: ${product.title}`}
              />
            </div>
            <h1>{product.title}</h1>
            <p>{product.desc}</p>
            <ul>
              <li>{product.size}</li>
              <li>{product.color}</li>
              <li>{product.price}</li>
              <li>{product.qte}</li>
              <li>{product.status}</li>
              <li>{product.deliveryDate}</li>
            </ul>
            <div>
              <div onClick={() => openUpdateModal(product)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z" />
                  </g>
                </svg>
              </div>

              <div onClick={() => deletePoduct(product._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="black"
                      d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07A1.017 1.017 0 0 1 5 7H4a1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        ))}
        {isOpenCreateModal && (
          <CreateProduct
            closeCreateModal={() => setIsOpenCreateModal(false)}
            onAddProduct={onAddProduct}
          />
        )}
        {isOpenUpdateModal && recipeToEdit && (
          <UpdateProduct
            closeUpdateModal={() => setIsOpenUpdateModal(false)}
            updateProduct={updateProduct}
            recipeToEdit={recipeToEdit}
          />
        )}
      </div>
    </div>
  );
};
