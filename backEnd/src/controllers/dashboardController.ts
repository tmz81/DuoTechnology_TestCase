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

export const getRecentVehicles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recentVehicles = await prisma.vehicles.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        model: true,
        year: true,
        daily_price: true,
        createdAt: true,
        brand: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            description: true,
          }
        }
      },
    });

    res.json(recentVehicles);
  } catch (error) {
    console.error("Erro ao buscar veículos recentes:", error);
    res.status(500).json({ error: "Erro ao buscar veículos recentes" });
  }
};
