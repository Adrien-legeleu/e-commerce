import React, { useState } from "react";
import { FloatButton, Select, Slider, Switch, Tag } from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import {
  filterColor,
  filterDeliveryDate,
  filterPrice,
  filterSize,
} from "./FunctionFilter";
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

  const [isOpenFilterCmponent, setIsOpenFilterComponent] = useState(false);

  return (
    <>
      <div>
        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{ right: 24 }}
          icon={<CustomerServiceOutlined />}
        >
          <FloatButton />
          <FloatButton
            icon={<CommentOutlined />}
            onClick={() => setIsOpenFilterComponent(!isOpenFilterCmponent)}
          />
        </FloatButton.Group>
      </div>
      <div
        className={`h-screen w-screen fixed top-0 left-0 z-40 ${
          isOpenFilterCmponent ? "block" : "hidden"
        }`}
        onClick={() => setIsOpenFilterComponent(false)}
      ></div>
      <div
        className={`px-8 w-1/4 items-center justify-center gap-8 fixed top-1/2 z-50 right-12 flex flex-col -translate-y-1/2 bg-white py-12 rounded-3xl shadow-2xl ${
          isOpenFilterCmponent
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
          onChange={(value) =>
            filterColor(value, setProducts, productsFiltered)
          }
        />
        <Select
          mode="multiple"
          placeholder="Taille"
          style={{ width: "100%" }}
          options={optionsSize.map((size) => ({ value: size }))}
          onChange={(value) => filterSize(value, setProducts, productsFiltered)}
        />
        {/* Ajoutez ici d'autres sélecteurs et éléments de filtre */}
        <Slider
          range
          step={1}
          defaultValue={[0, 0]}
          min={1}
          max={547}
          style={{ width: "100%" }}
          onChange={(value) =>
            filterPrice(value, setProducts, productsFiltered)
          }
        />

        <p>
          Livraison rapide :{" "}
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) =>
              filterDeliveryDate(value, setProducts, productsFiltered)
            }
          />
        </p>
      </div>
    </>
  );
};
