import { IProduct } from "../types/product";

export const filterColor = (
  valueToFilter: string[],
  products: IProduct[]
): IProduct[] => {
  return products.filter((product) =>
    product.color.some((color) => valueToFilter.includes(color))
  );
};

export const filterSize = (
  valueToFilter: string[],
  products: IProduct[]
): IProduct[] => {
  return products.filter((product) =>
    product.size.some((size) => valueToFilter.includes(size))
  );
};

// export const filterType = (
//   valueToFilter: string[],
//   products: IProduct[]
// ): IProduct[] => {
//   return products.filter((product) =>
//     product.type.some((type) => valueToFilter.includes(type))
//   );
// };
