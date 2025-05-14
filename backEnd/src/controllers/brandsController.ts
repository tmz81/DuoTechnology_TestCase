import { Request, Response } from "express";
import prisma from "../prisma/client";
import { IBrands } from "../interfaces/IBrands";

export const getAllBrands = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const marcas = await prisma.brands.findMany();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar marcas" });
  }
};

export const getBrandById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const marca = await prisma.brands.findUnique({
      where: { id: parseInt(id) },
    });
    if (!marca) {
      res.status(404).json({ error: "Marca não encontrada" });
    }
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar marca" });
  }
};

export const createBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name }: IBrands = req.body;
  try {
    const novaMarca = await prisma.brands.create({
      data: { name },
    });
    res.status(201).json(novaMarca);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar marca" });
  }
};

export const updateBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name }: IBrands = req.body;
  try {
    const marcaAtualizada = await prisma.brands.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(marcaAtualizada);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar marca" });
  }
};

export const deleteBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const veiculos = await prisma.vehicles.findMany({
      where: { id_brand: parseInt(id) },
    });

    if (veiculos.length > 0) {
      res.status(400).json({
        error: "Não é possível excluir marca com veículos associados",
      });
    }

    await prisma.brands.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir marca" });
  }
};
