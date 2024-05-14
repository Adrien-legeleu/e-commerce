import { Request, Response } from "express";
import { CartModel } from "../models/cart";

export class CartController {
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;

      // Récupérer le panier avec les produits associés chargés
      const cart = await CartModel.findOne({ userId: user._id }).populate(
        "products.product"
      );

      if (!cart) {
        return res
          .status(404)
          .json({ message: "Le panier de l'utilisateur n'a pas été trouvé" });
      }

      res.json(cart.products);
    } catch (error) {
      console.error("Erreur lors de la recherche du panier :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du panier de l'utilisateur",
      });
    }
  }
}
