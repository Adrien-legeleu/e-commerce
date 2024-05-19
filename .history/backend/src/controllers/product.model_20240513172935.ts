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

  async findOneById(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;
      const { productId } = req.params;
      const product = await ProductModel.findOne({ _id: productId, userId });
      if (!product) {
        res.status(400).send({
          error: `Product ${productId} not found `,
        });
      }
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
