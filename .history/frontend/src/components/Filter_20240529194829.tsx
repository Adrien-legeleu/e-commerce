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
  const optionsTypes: SelectProps["options"] = [
    { value: "haut de survetement" },
    { value: "bas de survetement" },
    { value: "chaussures" },
    { value: "couvre-chef" },
    { value: "vetements haut" },
    { value: "accessoires" },
    { value: "vêtements bas" },
  ];
  const optionsSize: SelectProps["options"] = [
    { value: "XS" },
    { value: "S" },
    { value: "M" },
    { value: "L" },
    { value: "XL" },
    { value: "XXL" },
  ];

  type TagRender = SelectProps["tagRender"];

  const tagRender: TagRender = (props) => {
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
        onChange={() => filterColor(e.target.value, products)}
      />
      <Select
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
