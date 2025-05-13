import { Request, Response } from "express";
import prisma from "../prismaClient";
import { ICategoria } from "../interfaces/ICategoria";

export const getAllCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await prisma.categoria.findMany();
    return res.json(categorias);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};

export const getCategoriaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
    });
    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

export const createCategoria = async (req: Request, res: Response) => {
  const { descricao }: ICategoria = req.body;
  try {
    const novaCategoria = await prisma.categoria.create({
      data: { descricao },
    });
    return res.status(201).json(novaCategoria);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar categoria" });
  }
};

export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { descricao }: ICategoria = req.body;
  try {
    const categoriaAtualizada = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: { descricao },
    });
    return res.json(categoriaAtualizada);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao atualizar categoria" });
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const veiculos = await prisma.veiculo.findMany({
      where: { id_categoria: parseInt(id) },
    });

    if (veiculos.length > 0) {
      return res.status(400).json({
        error: "Não é possível excluir categoria com veículos associados",
      });
    }

    await prisma.categoria.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: "Erro ao excluir categoria" });
  }
};
