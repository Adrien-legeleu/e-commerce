import { IProduct } from "../types/product";

export const filterColor = (
  valueToFilter: string[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  productsFiltered: IProduct[]
): void => {
  // Si aucun filtre de couleur n'est sélectionné, retourner tous les produits
  if (valueToFilter.length === 0) {
    setProducts(productsFiltered);
    return;
  }

  // Créer un tableau pour les produits filtrés
  const filteredProducts: IProduct[] = [];

  // Parcourir les produits et vérifier si une couleur correspond
  productsFiltered.forEach((product) => {
    if (product.color.some((color) => valueToFilter.includes(color))) {
      filteredProducts.push(product);
    }
  });
  console.log(productsFiltered);

  // Mettre à jour les produits filtrés
  setProducts(filteredProducts);
};
