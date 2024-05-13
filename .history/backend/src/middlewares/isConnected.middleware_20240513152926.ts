import { type Response } from "express";
import jwt from "jsonwebtoken";

export class IsConnectedMiddleware {
  execute(req: any, res: Response, bext: any);
}
