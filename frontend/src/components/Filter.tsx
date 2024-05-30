import React from "react";
import { Select, Slider, Switch, Tag } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { filterColor, filterSize } from "./FunctionFilter";
import { IProduct } from "../types/product";

interface IFilterProps {
  productsFiltered: IProduct[];
  setProductsFiltered: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const Filter: React.FC<IFilterProps> = ({
  productsFiltered,
  setProducts,
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

  const optionsSize = ["XS", "S", "M", "L", "XL", "XXL"];

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

  return (
    <>
      <Select
        mode="multiple"
        placeholder="Couleur"
        style={{ width: "100%" }}
        tagRender={tagRender}
        options={optionsColor.map((color) => ({ value: color }))}
        onChange={(value) => filterColor(value, setProducts, productsFiltered)}
      />
      <Select
        mode="multiple"
        placeholder="Taille"
        style={{ width: "100%" }}
        options={optionsSize.map((size) => ({ value: size }))}
        onChange={(value) => filterSize(value, setProducts, productsFiltered)}
      />
      {/* Ajoutez ici d'autres sélecteurs et éléments de filtre */}
      <Slider range step={1} defaultValue={[20, 50]} min={1} max={547} />

      <p>
        Livraison rapide :{" "}
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={false}
        />
      </p>
    </>
  );
};
