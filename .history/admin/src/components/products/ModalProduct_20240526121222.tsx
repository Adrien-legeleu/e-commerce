import React, { useState, useEffect } from "react";
import { Select } from "antd";
import FileProduct from "./FileProduct";
import type { UploadFile } from "antd/lib/upload/interface";
import type { IProduct } from "../../types/product";

interface ModalProps {
  closeModal: () => void;
  onSaveProduct: (dataProduct: Partial<IProduct>) => Promise<void>;
  title: string;
  params: {
    title: boolean;
    desc: boolean;
    price: boolean;
    deliveryDate: boolean;
    imgUrl: boolean;
    qte: boolean;
    size: boolean;
    color: boolean;
    status?: boolean;
  };
  initialProductData?: Partial<IProduct>;
}

const colorOptions = [
  { value: "blue" },
  { value: "red" },
  { value: "yellow" },
  { value: "brown" },
  { value: "white" },
  { value: "black" },
  { value: "green" },
  { value: "gray" },
  { value: "multicolor" },
];

const sizeOptions = [
  { value: "XS" },
  { value: "S" },
  { value: "M" },
  { value: "L" },
  { value: "XL" },
  { value: "XXL" },
];

export const ModalProduct: React.FC<ModalProps> = ({
  closeModal,
  onSaveProduct,
  title,
  params,
  initialProductData,
}) => {
  const [dataProduct, setDataProduct] = useState<Partial<IProduct>>({
    title: initialProductData?.title || "",
    desc: initialProductData?.desc || "",
    size: initialProductData?.size || undefined,
    color: initialProductData?.color || undefined,
    qte: initialProductData?.qte || undefined,
    price: initialProductData?.price || undefined,
    deliveryDate: initialProductData?.deliveryDate || undefined,
    imgUrl: initialProductData?.imgUrl || [],
    status: initialProductData?.status || "in stock",
  });

  const [images, setImages] = useState<string[]>(
    initialProductData?.imgUrl || []
  );

  const changeProductValue = (key: keyof IProduct | string, value: any) => {
    setDataProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveProducts = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onSaveProduct(dataProduct);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductImageUpload = (key: string, fileList: UploadFile[]) => {
    const newImages: string[] = fileList.map((file) => file.url || "");
    console.log(newImages);

    setImages(newImages);
    changeProductValue(key, newImages);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-[#00000060] backdrop-blur-sm"
        onClick={closeModal}
      ></div>
      <div className="shadow-2xl bg-white w-3/4 z-10 pb-10 px-20 rounded-3xl space-y-10 relative">
        <div
          className="absolute top-6 right-8 w-10 h-10 hover:scale-110 duration-300 cursor-pointer group"
          onClick={closeModal}
        >
          <div className="w-[5px] h-full bg-[#ca0101c0] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:rotate-45 duration-300"></div>
          <div className="w-[5px] h-full bg-[#ca0101c0] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:-rotate-45 duration-300"></div>
        </div>
        <h1 className="text-center text-2xl">{title}</h1>
        <form className="space-y-8" onSubmit={handleSaveProducts}>
          <div className="grid grid-cols-3 gap-8 ">
            {Object.entries(params).map(([key, value]) => {
              if (!value || !(key in dataProduct)) return null;
              const fieldTitle = key.charAt(0).toUpperCase() + key.slice(1);
              const valueData = dataProduct[key as keyof typeof dataProduct];

              if (key === "status") {
                return (
                  <div key={key}>
                    <label>{fieldTitle}</label>
                    <select
                      name={key}
                      id={key}
                      value={valueData as string | number | undefined}
                      onChange={(e) =>
                        changeProductValue(
                          key as keyof IProduct,
                          e.target.value
                        )
                      }
                    >
                      <option value="in stock">In stock</option>
                      <option value="out stock">Out of stock</option>
                    </select>
                  </div>
                );
              }
              if (key === "size") {
                return (
                  <div key={key}>
                    <label>{fieldTitle}</label>
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      value={valueData as string[] | undefined}
                      onChange={(value) =>
                        changeProductValue(key as keyof IProduct, value)
                      }
                      options={sizeOptions}
                      className="w-full"
                    />
                  </div>
                );
              }
              if (key === "color") {
                return (
                  <div key={key}>
                    <label>{fieldTitle}</label>
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      value={valueData as string[] | undefined}
                      onChange={(value) =>
                        changeProductValue(key as keyof IProduct, value)
                      }
                      options={colorOptions}
                      className="w-full"
                    />
                  </div>
                );
              }
              if (key === "imgUrl") {
                return (
                  <div key={key} className="col-span-3">
                    <label>{fieldTitle}</label>
                    <FileProduct
                      handleProductImageUpload={handleProductImageUpload}
                      imgUrlKey={key as keyof IProduct}
                      initialImages={images} // Passer les images initiales
                    />
                  </div>
                );
              }

              return (
                <div key={key}>
                  <label>{fieldTitle}</label>
                  <input
                    type={typeof valueData === "number" ? "number" : "text"}
                    name={key}
                    id={key}
                    value={valueData as string | number | undefined}
                    onChange={(e) =>
                      changeProductValue(key as keyof IProduct, e.target.value)
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <button className="py-3 px-8 bg-primaryColor text-white rounded-lg hover:scale-105 duration-300 cursor-pointer">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
