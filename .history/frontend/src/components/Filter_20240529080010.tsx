export const Filter = () => {
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
