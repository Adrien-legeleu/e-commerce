import mongoose from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createAT: Date;
  updateAT: Date;
}

const USerSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
});
