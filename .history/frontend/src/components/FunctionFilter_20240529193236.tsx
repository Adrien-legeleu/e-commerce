export const filterColor = (valueToFilter: string[], products: Product[]) => {
  return products.filter((product) => valueToFilter.includes(product.color));
};

export const filterSize = (valueToFilter: string[], products: Product[]) => {
  return products.filter((product) => valueToFilter.includes(product.size));
};

export const filterType = (valueToFilter: string[], products: Product[]) => {
  return products.filter((product) => valueToFilter.includes(product.type));
};
