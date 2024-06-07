import React, { useState } from "react";
import { InputNumber, Select, Slider } from "antd";
import FileProduct from "./FileProduct";
import type { UploadFile } from "antd/lib/upload/interface";
import type { IProduct } from "../../types/product";
import TextArea from "antd/es/input/TextArea";

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
    sexe: boolean;
    brand: boolean;
    typeClothe: boolean;
    matter: boolean;
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
const sexeOptions = [
  { value: "Homme" },
  { value: "Femme" },
  { value: "Enfant" },
  { value: "Unisexe" },
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
    sexe: initialProductData?.sexe || undefined,
    typeClothe: initialProductData?.typeClothe || undefined,
    brand: initialProductData?.brand || undefined,
    matter: initialProductData?.matter || undefined,
  });

  const [images, setImages] = useState<string[]>(
    initialProductData?.imgUrl || []
  );

  const changeProductValue = (key: keyof IProduct | string, value: any) => {
    setDataProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(dataProduct);
  };

  const handleSaveProducts = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !dataProduct.title ||
      !dataProduct.desc ||
      !dataProduct.typeClothe ||
      !dataProduct.brand ||
      !dataProduct.size ||
      !dataProduct.color ||
      !dataProduct.qte ||
      !dataProduct.imgUrl ||
      !dataProduct.deliveryDate ||
      !dataProduct.matter ||
      !dataProduct.price ||
      !dataProduct.sexe
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await onSaveProduct(dataProduct);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductImageUpload = (key: string, fileList: UploadFile[]) => {
    const newImages: string[] = fileList.map((file) => file.url || "");
    setImages(newImages);
    changeProductValue(key, newImages);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-[#00000060] backdrop-blur-sm"
        onClick={closeModal}
      ></div>
      <div
        className="shadow-2xl bg-white w-3/4 h-[90%] overflow-y-auto z-10 pb-10 px-8  rounded-3xl space-y-10 relative"
        style={{ scrollbarWidth: "none" }}
      >
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
              if (key === "desc") {
                return (
                  <div key={key} className="row-span-2 flex flex-col gap-1">
                    <TextArea
                      showCount
                      maxLength={140}
                      value={valueData as string | number | undefined}
                      onChange={(e) =>
                        changeProductValue(
                          key as keyof IProduct,
                          e.target.value
                        )
                      }
                      placeholder="description de votre produit"
                      style={{ resize: "none", height: "100%" }}
                    />
                  </div>
                );
              }
              if (key === "deliveryDate") {
                return (
                  <div key={key} className="row-span-2 flex flex-col gap-1">
                    <label>Date de livraison (en jour)</label>
                    <Slider
                      range
                      step={1}
                      value={valueData as any}
                      max={20}
                      min={1}
                      onChange={(value) =>
                        changeProductValue(key as keyof IProduct, value)
                      }
                    />
                  </div>
                );
              }
              if (key === "price") {
                return (
                  <div key={key} className="row-span-2 flex flex-col gap-1">
                    <label>prix en euros</label>
                    <InputNumber
                      changeOnWheel
                      min={1}
                      max={100000}
                      value={valueData as string | number | undefined}
                      onChange={(value) =>
                        changeProductValue(key as keyof IProduct, value)
                      }
                    />
                  </div>
                );
              }
              if (key === "qte") {
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <label>{fieldTitle}</label>
                    <InputNumber
                      changeOnWheel
                      min={1}
                      max={1000}
                      value={valueData as string | number | undefined}
                      onChange={(value) =>
                        changeProductValue(key as keyof IProduct, value)
                      }
                    />
                  </div>
                );
              }
              if (key === "sexe") {
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <label>{fieldTitle}</label>
                    <Select
                      showSearch
                      placeholder="Select a person"
                      value={valueData as string | undefined}
                      optionFilterProp="children"
                      onChange={(value) =>
                        changeProductValue(key as keyof IProduct, value)
                      }
                      options={sexeOptions}
                      style={{ width: "100%" }}
                    />
                  </div>
                );
              }
              if (key === "size") {
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <label>Taille</label>
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
                  <div key={key} className="flex flex-col gap-1">
                    <label>Couleur</label>
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
                  <div
                    key={key}
                    className="row-span-5 text-center border-2 border-dashed py-5 px-6 rounded-3xl flex flex-col gap-1"
                  >
                    <label className="inline-block mb-5">Vos images</label>
                    <FileProduct
                      handleProductImageUpload={handleProductImageUpload}
                      imgUrlKey={key as keyof IProduct}
                      initialImages={images}
                    />
                  </div>
                );
              }
              if (key === "typeClothe") {
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <label>Catégorie</label>
                    <Select
                      placeholder="Please select"
                      value={valueData as string[] | undefined}
                      onChange={(value) =>
                        changeProductValue(key as keyof IProduct, value)
                      }
                      style={{ width: "100%" }}
                      options={typeClotheList}
                    />
                  </div>
                );
              }
              if (key === "brand") {
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <label>Marque</label>
                    <Select
                      placeholder="Please select"
                      value={valueData as string[] | undefined}
                      onChange={(value) =>
                        changeProductValue(key as keyof IProduct, value)
                      }
                      style={{ width: "100%" }}
                      showSearch
                      options={brandOptions}
                    />
                  </div>
                );
              }
              if (key === "matter") {
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <label>matière</label>
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      value={valueData as string[] | undefined}
                      onChange={(value) =>
                        changeProductValue(key as keyof IProduct, value)
                      }
                      style={{ width: "100%" }}
                      options={materialOptions}
                    />
                  </div>
                );
              }
              return (
                <div key={key}>
                  <div className="relative h-11 w-full min-w-[200px] flex flex-col gap-1">
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

const typeClotheList = [
  { value: "chaussure" },
  { value: "pantalon" },
  { value: "t-shirt" },
  { value: "veste" },
  { value: "robe" },
  { value: "sous-vetement" },
  { value: "pull" },
  { value: "costume" },
  { value: "sport" },
  { value: "accessoire" },
];

const materialOptions = [
  {
    label: <span>Vêtements</span>,
    title: "Vêtements",
    options: [
      { label: <span>Coton</span>, value: "coton" },
      { label: <span>Laine</span>, value: "laine" },
      { label: <span>Soie</span>, value: "soie" },
      { label: <span>Polyester</span>, value: "polyester" },
      { label: <span>Cuir</span>, value: "cuir" },
      { label: <span>Denim</span>, value: "denim" },
      { label: <span>Lin</span>, value: "lin" },
      { label: <span>Nylon</span>, value: "nylon" },
      { label: <span>Viscose</span>, value: "viscose" },
      { label: <span>Spandex</span>, value: "spandex" },
    ],
  },
  {
    label: <span>Accessoires</span>,
    title: "Accessoires",
    options: [
      { label: <span>Acier</span>, value: "acier" },
      { label: <span>Or</span>, value: "or" },
      { label: <span>Argent</span>, value: "argent" },
      { label: <span>Plastique</span>, value: "plastique" },
      { label: <span>Bois</span>, value: "bois" },
      { label: <span>Verre</span>, value: "verre" },
      { label: <span>Cuivre</span>, value: "cuivre" },
      { label: <span>Titane</span>, value: "titane" },
      { label: <span>Laiton</span>, value: "laiton" },
      { label: <span>Caoutchouc</span>, value: "caoutchouc" },
    ],
  },
];

const brandOptions = [
  { value: "7 For All Mankind" },
  { value: "A.P.C." },
  { value: "Abercrombie & Fitch" },
  { value: "Acne Studios" },
  { value: "Adidas" },
  { value: "Aeropostale" },
  { value: "AG Jeans" },
  { value: "Aldo" },
  { value: "Alexander McQueen" },
  { value: "Alo Yoga" },
  { value: "American Eagle" },
  { value: "Arc'teryx" },
  { value: "Asics" },
  { value: "Athleta" },
  { value: "Bape" },
  { value: "Balenciaga" },
  { value: "Balmain" },
  { value: "Banana Republic" },
  { value: "Berluti" },
  { value: "Birkenstock" },
  { value: "Boden" },
  { value: "Boglioli" },
  { value: "Bottega Veneta" },
  { value: "Brooks" },
  { value: "Brioni" },
  { value: "Burberry" },
  { value: "Calvin Klein" },
  { value: "Canada Goose" },
  { value: "Canali" },
  { value: "Carhartt" },
  { value: "Celine" },
  { value: "Chanel" },
  { value: "Chloe" },
  { value: "Christian Louboutin" },
  { value: "Citizens of Humanity" },
  { value: "Clarks" },
  { value: "Coach" },
  { value: "Columbia" },
  { value: "Comme des Garçons" },
  { value: "Common Projects" },
  { value: "Converse" },
  { value: "Corneliani" },
  { value: "COS" },
  { value: "Crocs" },
  { value: "Diane von Fürstenberg" },
  { value: "Dickies" },
  { value: "Diesel" },
  { value: "Dior" },
  { value: "Dolce & Gabbana" },
  { value: "Dr. Martens" },
  { value: "Dries Van Noten" },
  { value: "Evisu" },
  { value: "Everlane" },
  { value: "Equipment" },
  { value: "Ermenegildo Zegna" },
  { value: "Escada" },
  { value: "Etro" },
  { value: "Fabletics" },
  { value: "Fendi" },
  { value: "Fear of God" },
  { value: "Frame" },
  { value: "G-Star Raw" },
  { value: "Gap" },
  { value: "Golden Goose" },
  { value: "Gucci" },
  { value: "Guess" },
  { value: "Gymshark" },
  { value: "H&M" },
  { value: "Helmut Lang" },
  { value: "Hermès" },
  { value: "Hobbs" },
  { value: "Hollister" },
  { value: "Hoka One One" },
  { value: "Hugo Boss" },
  { value: "Isabel Marant" },
  { value: "Isaia" },
  { value: "J Brand" },
  { value: "J.Crew" },
  { value: "Jil Sander" },
  { value: "Jimmy Choo" },
  { value: "Jordache" },
  { value: "JW Anderson" },
  { value: "Karen Millen" },
  { value: "Kate Spade" },
  { value: "Kenneth Cole" },
  { value: "Kenzo" },
  { value: "Kith" },
  { value: "Kiton" },
  { value: "Lacoste" },
  { value: "Lee" },
  { value: "Levi's" },
  { value: "Lorna Jane" },
  { value: "Loro Piana" },
  { value: "Louis Vuitton" },
  { value: "Lucky Brand" },
  { value: "Lululemon" },
  { value: "LVMH" },
  { value: "Maje" },
  { value: "Manolo Blahnik" },
  { value: "Marc Jacobs" },
  { value: "Massimo Dutti" },
  { value: "Max Mara" },
  { value: "Mavi Jeans" },
  { value: "Michael Kors" },
  { value: "Missoni" },
  { value: "Moncler" },
  { value: "Monsoon" },
  { value: "Moschino" },
  { value: "Mother" },
  { value: "Muji" },
  { value: "Nudie Jeans" },
  { value: "New Balance" },
  { value: "Nike" },
  { value: "Nine West" },
  { value: "Off-White" },
  { value: "Old Navy" },
  { value: "Oysho" },
  { value: "Paige" },
  { value: "Palace" },
  { value: "Patagonia" },
  { value: "Paul Smith" },
  { value: "Pepe Jeans" },
  { value: "Phase Eight" },
  { value: "Puma" },
  { value: "Prada" },
  { value: "Proenza Schouler" },
  { value: "Pull & Bear" },
  { value: "Rag & Bone" },
  { value: "Ralph Lauren" },
  { value: "Reebok" },
  { value: "Reiss" },
  { value: "Rick Owens" },
  { value: "Rodarte" },
  { value: "Saint Laurent" },
  { value: "Salomon" },
  { value: "Sam Edelman" },
  { value: "Sandro" },
  { value: "Saucony" },
  { value: "Scotch & Soda" },
  { value: "Skechers" },
  { value: "Spanx" },
  { value: "Steve Madden" },
  { value: "Stone Island" },
  { value: "Stradivarius" },
  { value: "Stuart Weitzman" },
  { value: "Stüssy" },
  { value: "Superdry" },
  { value: "Sweaty Betty" },
  { value: "Ted Baker" },
  { value: "Theory" },
  { value: "The North Face" },
  { value: "Thom Browne" },
  { value: "Timberland" },
  { value: "Toms" },
  { value: "Tommy Hilfiger" },
  { value: "Tory Burch" },
  { value: "Tory Sport" },
  { value: "True Religion" },
  { value: "UGG" },
  { value: "Under Armour" },
  { value: "Uniqlo" },
  { value: "Valentino" },
  { value: "Vans" },
  { value: "Versace" },
  { value: "Vetements" },
  { value: "Victoria's Secret" },
  { value: "Vince" },
  { value: "Vuori" },
  { value: "Wrangler" },
  { value: "Yeezy" },
  { value: "Yohji Yamamoto" },
  { value: "Zara" },
  { value: "Zella" },
  { value: "Zimmermann" },
];
