import mongoose from "mongoose";

export interface ICart {
  _id: string;
  userId: string;
  products: [];
}
