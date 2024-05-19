import mongoose from "mongoose";

export interface IProduct {
  _id: string;
  title: string;
  desc: string;
  price: number;
  imgUrl: string;
  color: string;
  size: string;
  deliveryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
