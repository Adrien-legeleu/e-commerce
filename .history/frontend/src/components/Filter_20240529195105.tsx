import React from 'react';
import { Select, SelectProps, Slider, Switch, Tag } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { filterColor } from "./FunctionFilter";
import { IProduct } from "../types/product";

interface IFilterProps {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const Filter: React.FC<IFilterProps> = ({ products, setProducts }) => {
  const optionsColor: SelectProps["options"] = [
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "brown", label: "Brown" },
    { value: "white", label: "White" },
    { value: "black", label: "Black" },
    { value: "green", label: "Green" },
    { value: "gray", label: "Gray" },
    { value: "multicolor", label: "Multicolor" },
  ];

  const tagRender: SelectProps['tagRender'] = (props) => {
    const { label, value, closable, onClose } = props;
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
        {label}
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
        options={optionsColor}
        onChange={(value) => filterColor(value, products, setProducts)}
      />
        mode="multiple"
        placeholder="Taille"
        style={{ width: "100%" }}
        options={optionsSize}
      />
      <Select
        mode="multiple"
        placeholder="Type"
        style={{ width: "100%" }}
        options={optionsTypes}
      />
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
