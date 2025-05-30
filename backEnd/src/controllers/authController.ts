import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../prisma/client";
import { IUsers } from "../interfaces/IUsers";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "Usuário não encontrado." });
      return;
    }

    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;
    }

    const authToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      authToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro durante o login" });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({
    user: {
      id: req.Users?.id,
      name: req.users?.name,
      email: req.users?.email,
      isAdmin: req.users?.isAdmin,
    },
  });
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password, isAdmin }: IUsers = req.body;
  try {
    const emailExistente = await prisma.users.findUnique({ where: { email } });
    if (emailExistente) {
      res.status(400).json({ error: "Email já cadastrado" });
      return;
    }

    const senhaHash = await bcrypt.hash(password, 10);

    const novoUsuario = await prisma.users.create({
      data: {
        name,
        email,
        password: senhaHash,
        isAdmin,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
};
