import { type Response } from "express";
import jwt from "jsonwebtoken";

export class IsConnectedMiddleware {
  execute(req: any, res: Response, bext: any): void {
    try {
      const authoToken = req.headers.authorization?.split(" ")?.[1] || "";
      if (!authoToken) {
        res.status(401).send({
          error: "No token",
        });
        return;
      }
    } catch (error: any) {
      console.log(error);
      res.status(401).send({
        error: error?.message,
      });
    }
  }
}
