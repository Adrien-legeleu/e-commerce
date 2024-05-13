import { type Response } from "express";
import { ProductModel } from "../models/product.model";
export class ProductController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;
      const products = await ProductModel.find({ userId });
      res.status(200).send(products);
    } catch (error: any) {
      console.log(error);
      req.status(500).send({
        error: error?.message,
      });
    }
  }
}
