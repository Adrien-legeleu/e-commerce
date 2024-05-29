import { Response } from "express";
import { ProductModel } from "../models/product.model";

export class ProductController {
  async findAll(req: any, res: Response): Promise<void> {
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

  async findOneById(req: any, res: Response): Promise<void> {
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

  async create(req: any, res: Response): Promise<void> {
    try {
      const { adminId } = req.admin;
      const { title, desc, price, color, size, deliveryDate, qte } = req.body;

      const imgUrl = req.files.map((file: any) => `/images/${file.filename}`);

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
      const { adminId } = req.admin;
      const { title, status, desc, price, color, size, deliveryDate, qte } =
        req.body;

      const imgUrl = req.files
        ? req.files.map((file: any) => `/images/${file.filename}`)
        : req.body.imgUrl;

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
