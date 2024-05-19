import mongoose from "mongoose";

export enum ProductStatusEnum {
  IN_STOCK = "in stock",
  OUT_STOCK = "out stock",
}
export interface IProduct {
  _id: string;
  adminId: string;
  status: ProductStatusEnum;
  title: string;
  desc: string;
  price: number;
  qte: number;
  imgUrl: string;
  color: string;
  size: string;
  deliveryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProudctSchema = new mongoose.Schema<IProduct>(
  {
    adminId: {
      type: String,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [ProductStatusEnum.IN_STOCK, ProductStatusEnum.OUT_STOCK],
      default: ProductStatusEnum.IN_STOCK,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model("products", ProudctSchema);
