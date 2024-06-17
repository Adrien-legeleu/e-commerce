export interface ICartOrder {
  userId: string;
  name: string;
  email: string;
  tel: string;
  country: string;
  city: string;
  adress: string;
  zipCode: string;
  price: number;
  cartOrder: {
    productId: string;
    title: string;
    desc: string;
    price: number;
    qte: number;
    qteToCart: number;
    imgUrl: string;
    brand: string;
    color: string;
    size: string;
    status: string;
    sexe: string;
    deliveryDate: number;
    favoris: number;
    isFavoris: boolean;
    isToCart: boolean;
  }[];
}
