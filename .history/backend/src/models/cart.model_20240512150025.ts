import mongoose, { Document } from "mongoose";

export interface ICart extends Document {
  userId: string;
  products: mongoose.Types.ObjectId[]; // Références aux produits
  updatedAt: Date;
}

const CartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Référence au modèle de produit
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model<ICart>("Cart", CartSchema);
