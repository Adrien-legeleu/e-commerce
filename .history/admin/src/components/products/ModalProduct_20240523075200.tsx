import React, { useState } from "react";
import { IProduct } from "../../types/product";
import { Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

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
    imgUrl: initialProductData?.imgUrl || "",
    status: initialProductData?.status || "in stock",
  });

  const changeProductValue = (key: keyof IProduct, value: any) => {
    setDataProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveProducts = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onSaveProduct(dataProduct);
      console.log(dataProduct);

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const [productImg, setProductImg] = useState("");

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
                      style={{ width: "100%" }}
                      options={sizeOptions}
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
                      style={{ width: "100%" }}
                      options={colorOptions}
                    />
                  </div>
                );
              }
              if (key === "imgUrl") {
                return (
                  <div key={key} onChange={handleProductImageUpload}>
                    <input type="file" accept="image/" />
                  </div>
                );
              }

              return (
                <div key={key}>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      placeholder={fieldTitle}
                      type="text"
                      id={key}
                      name={key}
                      value={valueData as string | number | undefined}
                      onChange={(e) =>
                        changeProductValue(
                          key as keyof IProduct,
                          e.target.value
                        )
                      }
                      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    />
                    <label className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      {fieldTitle}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-8">
            <button
              type="submit"
              className="py-3 px-5 rounded-full shadow-2xl bg-[#00000009] hover:scale-105 duration-150"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              className="py-3 px-5 rounded-full shadow-2xl bg-[#ca01011e] hover:scale-105 duration-150"
              onClick={closeModal}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
