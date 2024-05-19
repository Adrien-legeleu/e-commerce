import mongoose from "mongoose";

export interface ICart extends Document {
  userId: string;
  products: [];
  updatedAt: Date;
}

const CartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: String,
      required: true,
      ref: "users",
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
