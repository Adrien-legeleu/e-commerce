import { IProduct } from "../types/product";

export const FilterColor = (valueToFilter: string[], products: IProduct[]) => {
  return products.filter((product) => valueToFilter.includes(product.color));
};

export const FilterSize = (valueToFilter: string[], products: IProduct[]) => {
  return products.filter((product) => valueToFilter.includes(product.size));
};

export const FilterType = (valueToFilter: string[], products: IProduct[]) => {
  return products.filter((product) => valueToFilter.includes(product.type));
};
