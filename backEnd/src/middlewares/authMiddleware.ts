import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Acesso não autorizado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as {
      id: number;
    };
    const user = await prisma.users.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.status(401).json({ error: "Usuário não encontrado" });
    }

    req.body.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.user?.isAdmin) {
    return res
      .status(403)
      .json({ error: "Acesso negado. Requer privilégios de administrador" });
  }
  next();
};
