import { IProduct } from "../types/product";

export const filterColor = (
  valueToFilter: string[],
  products: IProduct[]
): IProduct[] => {
  return products.filter((product) => valueToFilter.includes(product.color));
};

export const filterSize = (
  valueToFilter: string[],
  products: IProduct[]
): IProduct[] => {
  return products.filter((product) => valueToFilter.includes(product.size));
};

export const filterType = (
  valueToFilter: string[],
  products: IProduct[]
): IProduct[] => {
  return products.filter((product) => valueToFilter.includes(product.type));
};
