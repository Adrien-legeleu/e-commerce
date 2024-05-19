import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUser, UserModel } from "../models/user.model";

export class AuthController {
  static getToken(user: IUser) {
    const jwtSecret = process.env.JWT_KEY ?? "";
    if (!jwtSecret) {
      throw new Error("jwt secret is not defined");
    }
    return jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(401).send({
          error: "Email or password are incorrect",
        });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(401).send({
          error: "password or email are incorrect",
        });
        return;
      }
      const isCorrectPassword = bcrypt.compareSync(password, user.password);
      if (!isCorrectPassword) {
        res.status(401).send({
          error: "email or password are incorrect",
        });
      }
      const authToken = AuthController.getToken(user);
      user.password = "";
      res.status(200).send({ user, authToken });
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ error: error?.message });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        res.status(400).send({ error: "Misssing properties" });
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = await UserModel.create({
        username,
        email,
        password: hashPassword,
      });
      const authToken = AuthController.getToken(user);
      //   user.password = "";
      res.status(200).send({ user, authToken });
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ error: error?.message });
    }
  }

  async loginAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(404).send({
          error: "Email or password not found",
        });
      }
    } catch (error) {}
  }
}
