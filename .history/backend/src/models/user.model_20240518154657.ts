import mongoose from "mongoose";

export enum UserStatusEnum {
  ADMIN = "admin",
  CLIENT = "client",
}

export interface IUser {
  _id: string;
  username: string;
  status: UserStatusEnum;
  email: string;
  password: string;
  createdAT: Date;
  updatedAT: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [UserStatusEnum.ADMIN, UserStatusEnum.CLIENT],
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("users", UserSchema);
