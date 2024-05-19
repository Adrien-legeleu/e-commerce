import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class IsConnectedMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
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
          error: "JWT secret is not defined",
        });
        return;
      }
      const decodedToken: any = jwt.verify(authToken, jwtSecret);
      req.admin = { adminId: decodedToken.userId }; // Assurez-vous que le payload du token contient adminId sous userId ou adminId
      next();
    } catch (error: any) {
      console.log(error);
      res.status(401).send({
        error: error?.message,
      });
    }
  }
}
