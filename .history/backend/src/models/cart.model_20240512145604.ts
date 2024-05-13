import mongoose from "mongoose";

export interface ICart {
  _id: string;
  userId: string;
  products: [];
  updateAt: Date;
}

const CartSchema = mongoose.Schema<ICart>({
  products: {
    type: Array,
  },
});
