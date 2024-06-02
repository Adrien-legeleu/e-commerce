export interface IProduct {
  _id: string;
  adminId: string;
  title: string;
  desc: string;
  price: number;
  qte: number;
  imgUrl: string[];
  color: string[];
  size: string[];
  status: string;
  sexe: string;
  deliveryDate: number;
  favoris: number;
  isFavoris: boolean;
  createdAt: Date;
  updatedAt: Date;
}
