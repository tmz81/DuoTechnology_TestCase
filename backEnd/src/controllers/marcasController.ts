import { Request, Response } from "express";
import prisma from "../prismaClient";
import { IMarca } from "../interfaces/IMarca";

export const getAllMarcas = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const marcas = await prisma.marca.findMany();
    return res.json(marcas);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar marcas" });
  }
};

export const getMarcaById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const marca = await prisma.marca.findUnique({
      where: { id: parseInt(id) },
    });
    if (!marca) {
      return res.status(404).json({ error: "Marca não encontrada" });
    }
    return res.json(marca);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar marca" });
  }
};

export const createMarca = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { nome }: IMarca = req.body;
  try {
    const novaMarca = await prisma.marca.create({
      data: { nome },
    });
    return res.status(201).json(novaMarca);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar marca" });
  }
};

export const updateMarca = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { nome }: IMarca = req.body;
  try {
    const marcaAtualizada = await prisma.marca.update({
      where: { id: parseInt(id) },
      data: { nome },
    });
    return res.json(marcaAtualizada);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao atualizar marca" });
  }
};

export const deleteMarca = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const veiculos = await prisma.veiculo.findMany({
      where: { id_marca: parseInt(id) },
    });

    if (veiculos.length > 0) {
      return res.status(400).json({
        error: "Não é possível excluir marca com veículos associados",
      });
    }

    await prisma.marca.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: "Erro ao excluir marca" });
  }
};
