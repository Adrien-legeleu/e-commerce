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

const ProudctSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
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
