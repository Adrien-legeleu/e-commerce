import { type Response } from "express";
import { CartModel } from "../models/cart.model";

export class CartController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.user;

      const cart = await CartModel.findOne({ userId }).populate(
        "products.product"
      );

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
      const { productId } = req.body;

      // Recherche du panier de l'utilisateur
      let cart = await CartModel.findOne({ userId });

      // Si l'utilisateur n'a pas encore de panier, en créer un nouveau
      if (!cart) {
        cart = new CartModel({
          userId,
          products: [],
          totalPrice: 0, // Vous pouvez initialiser le prix total ici
        });
      }

      // Vérifier si le produit existe déjà dans le panier
      const existingProduct = cart.products.find(
        (product: any) => product.toString() === productId
      );

      if (existingProduct) {
        res
          .status(400)
          .json({ message: "Le produit existe déjà dans le panier" });
        return;
      }

      // Ajouter le produit au panier
      cart.products.push(productId);

      // Calculer le nouveau prix total du panier (vous devez implémenter cette logique)
      // cart.totalPrice = ...

      // Enregistrer le panier mis à jour dans la base de données
      await cart.save();

      res.status(200).send(cart.products);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit au panier :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de l'ajout du produit au panier" });
    }
  }
}
