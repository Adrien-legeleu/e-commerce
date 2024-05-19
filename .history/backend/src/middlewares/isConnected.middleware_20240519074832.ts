import { type Response } from "express";
import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";

export class IsConnectedMiddleware {
  execute(req: any, res: Response, next: any): void {
    try {
      const authToken = req.headers.authorization?.split(" ")?.[1] || "";
      if (!authToken) {
        res.status(401).send({
          error: "No token",
        });
        return;
      }
      const jwtSecret = process.env.JWT_KEY;
      if (!jwtSecret) {
        res.status(500).send({
          error: "jwt secret is not defined",
        });
        return;
      }
      const decodedToken = jwt.verify(authToken, jwtSecret) as JwtPayload;
      req.admin = { adminId: decodedToken.adminId };
      next();
    } catch (error: any) {
      console.log(error);
      res.status(401).send({
        error: error?.message,
      });
    }
  }
}
