import { type Response } from "express";
import { ProductModel } from "../models/product.model";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URI_MONGODB || "";

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage }).array("files");

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
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      try {
        const { adminId } = req.admin;
        const { title, desc, price, color, size, deliveryDate, qte } = req.body;

        if (!adminId) {
          throw new Error("adminId is required");
        }

        const imgUrl = req.files.map((file) => `/api/files/${file.filename}`);

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
    });
  }

  async updateOneById(req: any, res: Response): Promise<void> {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      try {
        const { productId } = req.params;
        const { adminId } = req.admin;
        const { title, status, desc, price, color, size, deliveryDate, qte } =
          req.body;

        const imgUrl = req.files.length
          ? req.files.map((file) => `/api/files/${file.filename}`)
          : undefined;

        const updateData = {
          ...(title && { title }),
          ...(status && { status }),
          ...(desc && { desc }),
          ...(price && { price }),
          ...(color && { color }),
          ...(size && { size }),
          ...(deliveryDate && { deliveryDate }),
          ...(qte && { qte }),
          ...(imgUrl && { imgUrl }),
        };

        const product = await ProductModel.findOneAndUpdate(
          { adminId, _id: productId },
          updateData,
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
    });
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
