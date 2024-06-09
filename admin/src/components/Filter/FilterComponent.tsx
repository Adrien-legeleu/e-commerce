import React, { useState, useEffect } from "react";
import { FloatButton, Select, Slider, Switch, Tag } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Filter, ListFilter, Plus, SlidersHorizontal } from "lucide-react";
import { TriComponent } from "./TriComponent";
import { applyAllFilters } from "./FunctionFilter";
import { IProduct } from "../../types/product";

interface IFilterProps {
  productsFiltered: IProduct[];
  setProductsFiltered: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  openCreateModal: () => void;
}

export const FilterComponent: React.FC<IFilterProps> = ({
  productsFiltered,
  setProducts,
  openCreateModal,
}) => {
  const optionsColor = [
    "blue",
    "red",
    "yellow",
    "brown",
    "white",
    "black",
    "green",
    "gray",
    "multicolor",
  ];
  const typeClotheOptions = [
    "chaussure",
    "pantalon",
    "t-shirt",
    "veste",
    "robe",
    "sous-vetement",
    "pull",
    "costume",
    "sport",
    "accessoire",
  ];

  const optionsSize = ["XS", "S", "M", "L", "XL", "XXL"];
  const optionsSexe = ["Femme", "Homme", "Unisexe", "Enfant"];

  const tagRender = (props: any) => {
    const { value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        closeIcon={
          value === "white" ? (
            <CloseOutlined style={{ color: "black" }} />
          ) : null
        }
        style={{
          marginInlineEnd: 4,
          color: value === "black" ? "white" : "black",
          border: value === "white" ? "1px solid #00000030" : "",
        }}
      >
        {value}
      </Tag>
    );
  };

  const [isOpenFilterComponent, setIsOpenFilterComponent] = useState(false);
  const [isOpenTriComponent, setIsOpenTriComponent] = useState(false);
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    sexe: [],
    price: [0, 550],
    typeClothe: [],
    deliveryDate: false,
  });

  useEffect(() => {
    applyAllFilters(filters, productsFiltered, setProducts);
  }, [filters, productsFiltered, setProducts]);

  return (
    <>
      <div>
        <FloatButton
          tooltip={<div>Nouveau produit</div>}
          icon={<Plus className="w-full h-full" />}
          onClick={openCreateModal}
          className="fixed bottom-20 right-10"
        />
        <FloatButton.Group
          trigger="hover"
          className="fixed bottom-36 right-10"
          icon={<Filter className="w-full h-full" />}
        >
          <FloatButton
            icon={<ListFilter className="w-full h-full" />}
            tooltip={<div>Trier</div>}
            onClick={() => {
              setIsOpenTriComponent(!isOpenTriComponent);
              setIsOpenFilterComponent(false);
            }}
          />
          <FloatButton
            tooltip={<div>Filtrer</div>}
            icon={<SlidersHorizontal className="w-full h-full" />}
            onClick={() => {
              setIsOpenFilterComponent(!isOpenFilterComponent);
              setIsOpenTriComponent(false);
            }}
          />
        </FloatButton.Group>
      </div>

      <div>
        <TriComponent
          isOpenTriComponent={isOpenTriComponent}
          productsFiltered={productsFiltered}
          setProducts={setProducts}
        />
      </div>
      <div
        className={`h-screen w-screen fixed top-0 left-0 z-40 ${
          isOpenFilterComponent || isOpenTriComponent ? "block" : "hidden"
        }`}
        onClick={() => {
          setIsOpenFilterComponent(false);
          setIsOpenTriComponent(false);
        }}
      ></div>
      <div
        className={`px-8 w-1/4 items-center justify-center gap-8 fixed top-1/2 z-50 right-12 flex flex-col -translate-y-1/2 bg-white py-12 rounded-3xl shadow-2xl ${
          isOpenFilterComponent
            ? " visible translate-x-0 opacity-100"
            : "invisible opacity-0 translate-x-full"
        } duration-200 `}
      >
        <Select
          mode="multiple"
          placeholder="Couleur"
          style={{ width: "100%" }}
          tagRender={tagRender}
          options={optionsColor.map((color) => ({ value: color }))}
          onChange={(value) => setFilters({ ...filters, color: value })}
        />
        <Select
          mode="multiple"
          placeholder="Taille"
          style={{ width: "100%" }}
          options={optionsSize.map((size) => ({ value: size }))}
          onChange={(value) => setFilters({ ...filters, size: value })}
        />
        <Select
          mode="multiple"
          placeholder="Sexe"
          style={{ width: "100%" }}
          options={optionsSexe.map((sexe) => ({ value: sexe }))}
          onChange={(value) => setFilters({ ...filters, sexe: value })}
        />
        <Select
          mode="multiple"
          placeholder="Catégorie"
          style={{ width: "100%" }}
          options={typeClotheOptions.map((type) => ({ value: type }))}
          onChange={(value) => setFilters({ ...filters, typeClothe: value })}
        />

        <Slider
          range
          step={1}
          defaultValue={[0, 550]}
          min={1}
          max={550}
          style={{ width: "100%" }}
          onChange={(value) => setFilters({ ...filters, price: value })}
        />

        <p>
          Livraison rapide :{" "}
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) =>
              setFilters({ ...filters, deliveryDate: value })
            }
          />
        </p>
      </div>
    </>
  );
};
