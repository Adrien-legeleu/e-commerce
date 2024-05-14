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
        return;
      }
      res.status(200).send(product);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async create(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;
      const { title, desc, price, color, imgUrl, size, deliveryDate, qte } =
        req.body;

      const product = await ProductModel.create({
        userId,
        title,
        desc,
        price,
        imgUrl,
        size,
        color,
        deliveryDate,
      });
      res.status(200).send(product);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateOneById(req: any, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const { userId } = req.user;
      const {
        title,
        status,
        desc,
        price,
        color,
        imgUrl,
        size,
        deliveryDate,
        qte,
      } = req.body;
      const product = await ProductModel.findOneAndUpdate(
        {
          userId,
          _id: productId,
        },
        {
          ...(title ? { title } : {}),
          ...(status ? { status } : {}),
          ...(desc ? { desc } : {}),
          ...(price ? { price } : {}),
          ...(color ? { color } : {}),
          ...(size ? { size } : {}),
          ...(deliveryDate ? { deliveryDate } : {}),
          ...(qte ? { qte } : {}),
          ...(imgUrl ? { imgUrl } : {}),
        }
      );
      if (!product) {
        res.status(404).send({
          error: `Product ${productId} not found `,
        });
        return;
      }
      res.status(200).send(product);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async deleteOneById(req: any, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const { userId } = req.user;
      const product = await ProductModel.findOneAndDelete({
        userId,
        _id: productId,
      });
      if (!product) {
        res.status(404).send({
          error: `Product ${productId} not found`,
        });
        return;
      }
      res.status(200).send(product);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
