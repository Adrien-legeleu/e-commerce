import { IProduct } from "../types/product";

export const filterColor = (
  valueToFilter: string[],
  products: IProduct[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
): void => {
  const filteredProducts = products.filter((product) =>
    product.color.some((color) => valueToFilter.includes(color))
  );
  setProducts(filteredProducts);
};
