export const FunctionFilter = () => {
  const filterColor = (valueToFilter, products) => {
    products.map((product) => {
      valueToFilter.map((value) => {
        if (value == product.color) {
          return True;
        }
      });
    });
  };
};
