import mongoose from "mongoose";

export interface IProduct {
  _id: string;
  title: string;
  desc: string;
  price: number;
  img_url: string;
  color: string;
}
