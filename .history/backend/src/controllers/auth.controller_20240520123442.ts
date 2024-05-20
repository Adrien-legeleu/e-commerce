import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AdminModel, IAdmin } from "../models/admin.model";

export class AuthController {
  static getTokenAdmin(admin: IAdmin) {
    const jwtSecret = process.env.JWT_KEY ?? "";
    if (!jwtSecret) {
      throw new Error("jwt secret is not defined");
    }
    return jwt.sign(
      {
        adminId: admin._id,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );
  }
  checkTokenAdmin(req: any, res: Response): void {
    res.status(200).send(req.admin);
  }

  async loginAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(401).send({
          error: "Email or password are incorrect",
        });
        return;
      }
      const admin = await AdminModel.findOne({ email });
      if (!admin) {
        res.status(401).send({
          error: "Email or password are incorrect",
        });
        return;
      }
      const isCorrectPassword = bcrypt.compareSync(password, admin.password);
      if (!isCorrectPassword) {
        res.status(401).send({
          error: "Email or password are incorrect",
        });
        return;
      }
      const authToken = AuthController.getTokenAdmin(admin);
      admin.password = "";
      res.status(200).send({ admin, authToken });
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async registerAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        res.status(400).send({ error: "Misssing properties" });
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const admin = await AdminModel.create({
        username,
        email,
        password: hashPassword,
      });
      const authToken = AuthController.getTokenAdmin(admin);
      admin.password = "";
      res.status(200).send({ admin, authToken });
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ error: error?.message });
    }
  }
}
