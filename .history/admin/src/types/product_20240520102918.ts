export interface IProduct {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  price: number;
  qte: number;
  imgUrl: string;
  color: string;
  size: string;
  status: "in stock" | "out stock";
  deliveryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
