import { IProduct } from "../types/product";

export const filterColor = (
  valueToFilter: string[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  productsFiltered: IProduct[]
): void => {
  // Créer un tableau pour les produits filtrés
  const filteredProducts: IProduct[] = [];

  // Parcourir les produits et vérifier si une couleur correspond
  productsFiltered.forEach((product) => {
    if (product.color.some((color) => valueToFilter.includes(color))) {
      filteredProducts.push(product);
    }
  });

  // Mettre à jour les produits filtrés
  setProducts(filteredProducts);
};

export const filterSize = (
  valueToFilter: string[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  productsFiltered: IProduct[]
): void => {
  // Créer un tableau pour les produits filtrés
  const filteredProducts: IProduct[] = [];

  // Parcourir les produits et vérifier si une couleur correspond
  productsFiltered.forEach((product) => {
    if (product.size.some((size) => valueToFilter.includes(size))) {
      filteredProducts.push(product);
    }
  });

  // Mettre à jour les produits filtrés
  setProducts(filteredProducts);
};

export const filterPrice = (
  valueToFilter: number[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  productsFiltered: IProduct[]
) => {
  const filteredProducts: IProduct[] = [];
  productsFiltered.forEach((product) => {
    if (
      product.price >= valueToFilter[0] &&
      product.price <= valueToFilter[1]
    ) {
      filteredProducts.push(product);
    }
  });
  setProducts(filteredProducts);
};
export const filterDeliveryDate = (
  valueToFilter: boolean,
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  productsFiltered: IProduct[]
) => {
  if (valueToFilter) {
    const filteredProducts: IProduct[] = [];
    productsFiltered.forEach((product) => {
      if (product.deliveryDate < 5) {
        filteredProducts.push(product);
      }
    });
    setProducts(filteredProducts);
  } else {
    setProducts(productsFiltered);
  }
};
