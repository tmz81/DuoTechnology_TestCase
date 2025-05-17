import { Request, Response } from "express";
import prisma from "../prisma/client";
import { ICategorys } from "../interfaces/ICategorys";

export const getAllCategorys = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await prisma.categorys.findMany();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const category = await prisma.categorys.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { description }: ICategorys = req.body;
  console.log('AQUI =====> ', req.body)
  try {
    const novaCategoria = await prisma.categorys.create({
      data: { description },
    });
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar categoria" });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { description }: ICategorys = req.body;
  try {
    const updatedCategory = await prisma.categorys.update({
      where: { id: parseInt(id) },
      data: { description },
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar categoria" });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const vehicles = await prisma.vehicles.findMany({
      where: { id_category: parseInt(id) },
    });

    if (vehicles.length > 0) {
      res.status(400).json({
        error: "Não é possível excluir categoria com veículos associados",
      });
    }

    await prisma.categorys.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir categoria" });
  }
};
