import { IProduct } from "../../types/product";

export const applyFilters = (
  filters: { [key: string]: any },
  products: IProduct[]
): IProduct[] => {
  return products.filter((product) => {
    console.log(filters);

    for (const key in filters) {
      if (key === "deliveryDate" && filters[key] === true) {
        const avgDeliveryDate =
          (product.deliveryDate[0] + product.deliveryDate[1]) / 2;
        if (avgDeliveryDate >= 8) {
          return false;
        }
      } else if (filters[key].length > 0) {
        if (key === "color") {
          if (
            !filters[key].some((color: any) => product.color.includes(color))
          ) {
            return false;
          }
        } else if (key === "size") {
          if (!filters[key].some((size: any) => product.size.includes(size))) {
            return false;
          }
        } else if (key === "price") {
          const [minPrice, maxPrice] = filters[key];
          if (product.price < minPrice || product.price > maxPrice) {
            return false;
          }
        } else if (key === "typeClothe") {
          if (
            !filters[key].some((type: any) => product.typeClothe.includes(type))
          ) {
            return false;
          }
        } else if (key === "sexe") {
          if (!filters[key].includes(product.sexe)) {
            return false;
          }
        }
      }
    }
    return true;
  });
};

export const applyAllFilters = (
  filters: { [key: string]: any },
  products: IProduct[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
): void => {
  const filteredProducts = applyFilters(filters, products);
  setProducts(filteredProducts);
};
