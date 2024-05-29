export interface IProduct {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  price: number;
  qte: number;
  imgUrl: string;
  color:
    | "blue"
    | "red"
    | "yellow"
    | "brown"
    | "white"
    | "black"
    | "green"
    | "gray"
    | "multicolor";
  size: "blue" | "XS" | "S" | "M" | "L" | "Xl" | "XXL";
  status: "in stock" | "out stock";
  deliveryDate: number;
  createdAt: Date;
  updatedAt: Date;
}
