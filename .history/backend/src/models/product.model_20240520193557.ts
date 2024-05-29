import mongoose, { Document, Schema } from "mongoose";

export enum ProductStatusEnum {
  IN_STOCK = "in stock",
  OUT_STOCK = "out stock",
}

export enum ProductColorEnum {
  BLUE = "blue",
  RED = "red",
  YELLOW = "yellow",
  BROWN = "brown",
  WHITE = "white",
  BLACK = "black",
  GREEN = "green",
  GRAY = "gray",
  MULTICOLOR = "multicolor",
}

export enum ProductSizeEnum {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export interface IProduct extends Document {

  adminId: string;
  title: string;
  desc: string;
  price: number;
  qte: number;
  imgUrl: string;
  color: ProductColorEnum[];
  size: ProductSizeEnum[];
  status: ProductStatusEnum;
  deliveryDate: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {

    adminId: {
      type: String,
      required: true,
    },
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
    qte: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    color: {
      type: [String],
      enum: Object.values(ProductColorEnum),
      required: true,
    },
    size: {
      type: [String],
      enum: Object.values(ProductSizeEnum),
      required: true,
    },
    status: {
      type: String,
      enum: [ProductStatusEnum.IN_STOCK, ProductStatusEnum.OUT_STOCK],
      default: ProductStatusEnum.IN_STOCK,
      required: true,
    },
    deliveryDate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
