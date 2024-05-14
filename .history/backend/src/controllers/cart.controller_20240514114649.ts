import { Request, Response } from "express";
import { CartModel } from "../models/cart.model";
// Supposons que vous avez un modèle Cart pour représenter le panier en base de données

export class CartController {
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      // Obtenez l'utilisateur connecté, vous pouvez accéder à l'utilisateur à partir de la requête (supposant que vous ayez un middleware d'authentification qui ajoute l'utilisateur à la requête)
      const { user } = req.user;

      // Recherchez le panier de l'utilisateur dans la base de données en utilisant le modèle Cart
      const cart = await CartModel.findOne({ user: user._id }).populate(
        "products"
      ); // Supposons que vous stockiez les produits dans un tableau de références dans le modèle Cart

      // Si le panier n'existe pas, vous pouvez renvoyer une réponse appropriée
      if (!cart) {
        return res
          .status(404)
          .json({ message: "Le panier de l'utilisateur n'a pas été trouvé" });
      }

      // Si le panier existe, renvoyez les produits
      res.json(cart.products);
    } catch (error) {
      console.error("Erreur lors de la recherche du panier :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du panier de l'utilisateur",
      });
    }
  }
}
