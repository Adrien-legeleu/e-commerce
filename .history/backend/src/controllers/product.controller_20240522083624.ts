import Product from "../models/productModel";
import { Request, Response } from "express";

const ProductController = {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).send("Product not found");
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        res.status(404).send("Product not found");
        return;
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        res.status(404).send("Product not found");
        return;
      }
      res.status(200).send("Product deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

export default ProductController;
