import { Request, Response } from "express";
import prisma from "../prismaClient";
import { IVeiculo } from "../interfaces/IVeiculo";

export const getAllVeiculos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const veiculos = await prisma.veiculo.findMany({
      include: {
        marca: true,
        categoria: true,
      },
    });
    return res.json(veiculos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar veículos" });
  }
};

export const getVeiculoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: parseInt(id) },
      include: {
        marca: true,
        categoria: true,
      },
    });
    if (!veiculo) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }
    return res.json(veiculo);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar veículo" });
  }
};

export const createVeiculo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { modelo, ano, preco_diaria, id_marca, id_categoria }: IVeiculo =
    req.body;

  try {
    const marcaExiste = await prisma.marca.findUnique({
      where: { id: id_marca },
    });
    if (!marcaExiste) {
      return res.status(400).json({ error: "Marca não encontrada" });
    }

    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id: id_categoria },
    });
    if (!categoriaExiste) {
      return res.status(400).json({ error: "Categoria não encontrada" });
    }

    const novoVeiculo = await prisma.veiculo.create({
      data: {
        modelo,
        ano,
        preco_diaria,
        id_marca,
        id_categoria,
      },
    });
    return res.status(201).json(novoVeiculo);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar veículo" });
  }
};

export const updateVeiculo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { modelo, ano, preco_diaria, id_marca, id_categoria }: IVeiculo =
    req.body;

  try {
    const veiculoExiste = await prisma.veiculo.findUnique({
      where: { id: parseInt(id) },
    });
    if (!veiculoExiste) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    if (id_marca) {
      const marcaExiste = await prisma.marca.findUnique({
        where: { id: id_marca },
      });
      if (!marcaExiste) {
        return res.status(400).json({ error: "Marca não encontrada" });
      }
    }

    if (id_categoria) {
      const categoriaExiste = await prisma.categoria.findUnique({
        where: { id: id_categoria },
      });
      if (!categoriaExiste) {
        return res.status(400).json({ error: "Categoria não encontrada" });
      }
    }

    const veiculoAtualizado = await prisma.veiculo.update({
      where: { id: parseInt(id) },
      data: {
        modelo,
        ano,
        preco_diaria,
        id_marca,
        id_categoria,
      },
    });
    return res.json(veiculoAtualizado);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao atualizar veículo" });
  }
};

export const deleteVeiculo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    await prisma.veiculo.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: "Erro ao excluir veículo" });
  }
};
