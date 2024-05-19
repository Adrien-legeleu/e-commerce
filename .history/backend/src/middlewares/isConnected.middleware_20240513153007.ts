import { type Response } from "express";
import jwt from "jsonwebtoken";

export class IsConnectedMiddleware {
  execute(req: any, res: Response, bext: any): void {
    try {
    } catch (error: any) {
      console.log(error);
      res.status(401).send({
        error: error?.message,
      });
    }
  }
}
