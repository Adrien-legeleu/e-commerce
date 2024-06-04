export interface IProductCart {
  _id: string;
  title: string;
  desc: string;
  price: number;
  qte: number;
  imgUrl: string;
  color: string;
  size: string;
  status: string;
  sexe: string;
  deliveryDate: number;
  favoris: number;
  isFavoris: boolean;
  isToCart: boolean;
  createdAt: Date;
  updatedAt: Date;
}
