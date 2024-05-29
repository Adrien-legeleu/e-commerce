export const FunctionFilter = () => {
  const filterColor = (valueToFilter, products) => {
    return products.filter((product) => valueToFilter.includes(product.color));
  };
  const filterSize = (valueToFilter, products) => {
    return products.filter((product) => valueToFilter.includes(product.color));
  };
  const filterType = (valueToFilter, products) => {
    return products.filter((product) => valueToFilter.includes(product.color));
  };
};
