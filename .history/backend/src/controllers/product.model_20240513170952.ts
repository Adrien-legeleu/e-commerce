import { type Response } from "express";
import { ProductModel } from "../models/product.model";
export class ProductController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;
      const products = await ProductModel.find({ userId });
    } catch (error: any) {
      console.log(error);
      req.status(500).send({
        error: error?.message,
      });
    }
  }
}
