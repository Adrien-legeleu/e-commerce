import mongoose from "mongoose";

export interface ICart {
  _id: string;
  userId: string;
  products: [];
  updateAt: Date;
}

const CartSchema = new mongoose.Schema<ICart>(
  {
    products: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("cart", CartSchema);
