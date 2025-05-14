import { Request, Response } from "express";
import prisma from "../prisma/client";
import { ICategorys } from "../interfaces/ICategorys";

export const getAllCategorys = async (req: Request, res: Response) => {
  try {
    const category = await prisma.categorys.findMany();
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await prisma.categorys.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { description }: ICategorys = req.body;
  try {
    const novaCategoria = await prisma.categorys.create({
      data: { description },
    });
    return res.status(201).json(novaCategoria);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar categoria" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description }: ICategorys = req.body;
  try {
    const updatedCategory = await prisma.categorys.update({
      where: { id: parseInt(id) },
      data: { description },
    });
    return res.json(updatedCategory);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao atualizar categoria" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vehicles = await prisma.vehicles.findMany({
      where: { id_category: parseInt(id) },
    });

    if (vehicles.length > 0) {
      return res.status(400).json({
        error: "Não é possível excluir categoria com veículos associados",
      });
    }

    await prisma.categorys.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: "Erro ao excluir categoria" });
  }
};
