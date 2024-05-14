import mongoose from "mongoose";

export interface ICart extends Document {
  userId: string;
  products: Schema.Types.ObjectId[];
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
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model<ICart>("carts", CartSchema);
