import { IProduct } from "../types/product";

export const filterIncreasing = (
  productsFiltered: IProduct[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
): void => {
  const filteredProduct = productsFiltered.sort((a, b) => a.price - b.price);
  setProducts([...filteredProduct]);
};
export const filterDecreasing = (
  productsFiltered: IProduct[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
): void => {
  const filteredProduct = productsFiltered.sort((a, b) => b.price - a.price);
  setProducts([...filteredProduct]);
};
export const filterNew = (
  productsFiltered: IProduct[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
): void => {
  const filteredProduct = productsFiltered.sort(
    (a: any, b: any) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  setProducts([...filteredProduct]);
};
