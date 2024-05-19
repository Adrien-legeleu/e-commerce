import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";

export class ProductController {
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductModel.find();
      res.status(200).send(products);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async findOneById(req: Request, res: Response): Promise<void> {
    try {
      const { adminId } = req.admin;
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

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { adminId } = req.admin;
      const { title, desc, price, color, imgUrl, size, deliveryDate, qte } =
        req.body;

      if (!adminId) {
        res.status(400).send({ error: "adminId is required" });
        return;
      }

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

  async updateOneById(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const { adminId } = req.admin;
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
        },
        { new: true }
      );

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

  async deleteOneById(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const { adminId } = req.admin;

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
