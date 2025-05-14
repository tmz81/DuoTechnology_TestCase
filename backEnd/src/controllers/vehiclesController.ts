import { Request, Response } from "express";
import prisma from "../prisma/client";
import { IVehicles} from "../interfaces/Vehicles";

export const getAllVehicles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const veiculos = await prisma.vehicles.findMany({
      include: {
        brand: true,
        category: true,
      },
    });
    return res.json(veiculos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar veículos" });
  }
};

export const getVehicleById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const veiculo = await prisma.vehicles.findUnique({
      where: { id: parseInt(id) },
      include: {
        brand: true,
        category: true,
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

export const createVehicle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { model, year, daily_price, id_brand, id_category }: IVehicles =
    req.body;

  try {
    const marcaExiste = await prisma.brands.findUnique({
      where: { id: id_brand },
    });
    if (!marcaExiste) {
      return res.status(400).json({ error: "Marca não encontrada" });
    }

    const categoriaExiste = await prisma.categorys.findUnique({
      where: { id: id_category },
    });
    if (!categoriaExiste) {
      return res.status(400).json({ error: "Categoria não encontrada" });
    }

    const novoVeiculo = await prisma.vehicles.create({
      data: {
        model,
        year,
        daily_price,
        id_brand,
        id_category,
      },
    });
    return res.status(201).json(novoVeiculo);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar veículo" });
  }
};

export const updateVehicle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { model, year, daily_price, id_brand, id_category }: IVehicles =
    req.body;

  try {
    const veiculoExiste = await prisma.vehicles.findUnique({
      where: { id: parseInt(id) },
    });
    if (!veiculoExiste) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    if (id_brand) {
      const marcaExiste = await prisma.brands.findUnique({
        where: { id: id_brand },
      });
      if (!marcaExiste) {
        return res.status(400).json({ error: "Marca não encontrada" });
      }
    }

    if (id_category) {
      const categoriaExiste = await prisma.categorys.findUnique({
        where: { id: id_category },
      });
      if (!categoriaExiste) {
        return res.status(400).json({ error: "Categoria não encontrada" });
      }
    }

    const veiculoAtualizado = await prisma.vehicles.update({
      where: { id: parseInt(id) },
      data: {
        model,
        year,
        daily_price,
        id_brand,
        id_category,
      },
    });
    return res.json(veiculoAtualizado);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao atualizar veículo" });
  }
};

export const deleteVehicle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    await prisma.vehicles.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: "Erro ao excluir veículo" });
  }
};
