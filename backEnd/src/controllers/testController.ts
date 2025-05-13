import { Request, Response } from "express";

export const testRoute = (req: Request, res: Response) => {
  res.send("Test route working");
};
