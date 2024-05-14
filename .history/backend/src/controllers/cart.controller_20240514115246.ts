import { type Response } from "express";
import { CartModel } from "../models/cart.model";

export class CartController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;

      const cart = await CartModel.findOne(userId).populate("products.product");
      res.status(200).send(cart.products);
    } catch (error) {
      console.error("Erreur lors de la recherche du panier :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du panier de l'utilisateur",
      });
    }
  }
}
