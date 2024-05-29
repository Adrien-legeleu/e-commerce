import { Select, SelectProps, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export const Filter = () => {
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
    <div>
      <Select
        mode="multiple"
        tagRender={tagRender}
        style={{ width: "100%" }}
        options={optionsColor}
      />
    </div>
  );
};
