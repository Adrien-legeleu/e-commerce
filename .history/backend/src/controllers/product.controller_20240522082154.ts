import { type Response } from "express";
import { ProductModel } from "../models/product.model";
export class ProductController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const products = await ProductModel.find();
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
      const { adminId } = req.user;
      const { productId } = req.params;

      const product = await ProductModel.findOne({ adminId, _id: productId });

      if (!product) {
        res.status(404).send({
          error: `product ${productId} not found`,
        });
        return;
      }

      res.status(200).send(product);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ error: error?.message });
    }
  }

  async create(req: any, res: Response): Promise<void> {
    try {
      const { adminId } = req.user;
      const { title, desc, price, color, imgUrl, size, deliveryDate, qte } =
        req.body;

      const product = await ProductModel.create({
        adminId,
        title,
        desc,
        price,
        imgUrl,
        qte,
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
      const { adminId } = req.user;
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
          adminId,
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
      const { adminId } = req.user;
      const product = await ProductModel.findOneAndDelete({
        adminId,
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
