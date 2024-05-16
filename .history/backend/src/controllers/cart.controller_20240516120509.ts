import { type Response } from "express";
import { CartModel } from "../models/cart.model";
import { ProductModel } from "../models/product.model";

export class CartController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;

      const cart = await CartModel.findOne({ userId });

      if (!cart) {
        res
          .status(404)
          .send({ error: "Le panier de l'utilisateur n'a pas été trouvé" });
        return;
      }

      res.status(200).send(cart.products);
    } catch (error) {
      console.error("Erreur lors de la recherche du panier :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du panier de l'utilisateur",
      });
    }
  }

  async placeInCart(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;
      const { productId } = req.params;

      let cart = await CartModel.findOne({ userId });

      const product = await ProductModel.findById(productId);
      if (!cart) {
        cart = new CartModel({
          userId,
          products: [],
          totalPrice: 0,
        });
      }

      if (!product) {
        res.status(404).send({
          error: `product ${productId} not found`,
        });
        return;
      }
      const duplicateProducts = cart.products
        .map((p: any) => p._id.toString())
        .includes(productId);
      if (duplicateProducts) {
        res.status(409).send({
          error: `Product ${productId} is already added to the cart`,
        });
        return;
      }

      cart.products.push(product);
      cart.totalPrice += product.price;

      await cart.save();

      res.status(200).send(cart);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit au panier :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de l'ajout du produit au panier" });
    }
  }

  async removeToCart(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;
      const { productId } = req.params;
      let cart = await CartModel.findOne({ userId });
      const product = await ProductModel.findById(productId);

      if (!cart) {
        cart = new CartModel({
          userId,
          products: [],
          totalPrice: 0,
        });
      }
      if (!product) {
        res.status(404).send({
          error: `Product ${productId} not found`,
        });
        return;
      }

      cart.products = cart.products
        .map((product: any) => {
          return product.filter(
            (el: any) => el && el._id && el._id.toString() !== productId
          );
        })
        .filter((product: any) => product.length > 0);

      cart.totalPrice -= product.price;
      await cart.save();

      res.status(200).send(cart);
    } catch (error: any) {
      console.error("Error removing product from cart:", error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateProductOfcart(req: any, res: Response): Promise<void> {
    try {
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
