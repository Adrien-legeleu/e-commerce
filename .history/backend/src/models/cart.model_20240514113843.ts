import mongoose from "mongoose";

export interface ICart extends Document {
  userId: string;
  products: [];
  totalPrice: number;
  updatedAt: Date;
}

const CartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: String,
      required: true,
      ref: "users",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    products: [
      {
        type: Array,
        ref: "products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model<ICart>("carts", CartSchema);
