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

  import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Dans votre route, utilisez upload.array('img', maxCount) où 'img' est le nom du champ dans le formulaire et maxCount le nombre maximum d'images
// Exemple : app.post('/products', upload.array('img', 5), productController.create);

// Modification de la méthode create pour gérer plusieurs images
async create(req: any, res: Response): Promise<void> {
  try {
    const { adminId } = req.admin;
    const { title, desc, price, color, size, deliveryDate, qte } = req.body;
    let imgUrls = req.files.map(file => file.path);

    const product = await ProductModel.create({
      adminId,
      title,
      desc,
      price,
      imgUrls, // Ici on sauvegarde un tableau d'URLs au lieu d'une seule URL
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
