export interface IProductCart {
  _id: string;
  productId: string;
  title: string;
  desc: string;
  price: number;
  qte: number;
  qteToCart: number;
  imgUrl: string;
  color: string;
  size: string;
  status: string;
  brand: string;
  sexe: string;
  deliveryDate: number;
  favoris: number;
  isFavoris: boolean;
  isToCart: boolean;
  createdAt: Date;
  updatedAt: Date;
}
