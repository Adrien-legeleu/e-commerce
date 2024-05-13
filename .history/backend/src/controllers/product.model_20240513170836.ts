import { type Response } from "express";
export class ProductController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { user } = req.user;
    } catch (error: any) {
      console.log(error);
      req.status(500).send({
        error: error?.message,
      });
    }
  }
}
