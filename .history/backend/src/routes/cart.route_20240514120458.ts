import express from "express";
import { cartController } from "../controllers";

const cartRouter = express.Router();

cartRouter
  .get("/", cartController.findAll)
  .post("/:productid", cartController.placeInCart);

export default cartRouter;
