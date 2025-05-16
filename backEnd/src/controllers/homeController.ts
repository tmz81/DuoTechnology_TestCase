import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getTotal = async (req: Request, res: Response): Promise<void> => {
  try {
    const [vehiclesCount, brandsCount, categoriesCount] = await Promise.all([
      prisma.vehicles.count(),
      prisma.brands.count(),
      prisma.categorys.count(),
    ]);

    res.json({
      vehicles: vehiclesCount,
      brands: brandsCount,
      categories: categoriesCount,
    });
  } catch (error) {
    console.error("Erro ao buscar totais:", error);
    res.status(500).json({ error: "Erro ao buscar totais" });
  }
};
