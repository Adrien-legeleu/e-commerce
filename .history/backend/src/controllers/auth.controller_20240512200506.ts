import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUser, UserModel } from "../models/user.model";

export class AuthController {
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
    } catch (error) {}
  }
}
