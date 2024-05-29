export const Filter = () => {
  const options: SelectProps["options"] = [
    { value: "gold" },
    { value: "lime" },
    { value: "green" },
    { value: "cyan" },
  ];

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
        style={{ marginInlineEnd: 4 }}
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
        defaultValue={["gold", "cyan"]}
        style={{ width: "100%" }}
        options={options}
      />
    </div>
  );
};
