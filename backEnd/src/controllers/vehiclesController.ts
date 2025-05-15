import { Request, Response } from "express";
import prisma from "../prisma/client";
import { IVehicles } from "../interfaces/Vehicles";

export const getAllVehicles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const veiculos = await prisma.vehicles.findMany({
      include: {
        brand: true,
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(veiculos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar veículos" });
  }
};

export const getVehicleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const veiculo = await prisma.vehicles.findUnique({
      where: { id: parseInt(id) },
      include: {
        brand: true,
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!veiculo) {
      res.status(404).json({ error: "Veículo não encontrado" });
    }
    res.json(veiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar veículo" });
  }
};

export const createVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    model,
    year,
    daily_price,
    id_brand,
    id_category,
    id_user,
  }: IVehicles = req.body;

  try {
    const marcaExiste = await prisma.brands.findUnique({
      where: { id: id_brand },
    });

    if (!marcaExiste) {
      res.status(400).json({ error: "Marca não encontrada" });
      return;
    }

    const categoriaExiste = await prisma.categorys.findUnique({
      where: { id: id_category },
    });
    if (!categoriaExiste) {
      res.status(400).json({ error: "Categoria não encontrada" });
      return;
    }

    if (id_user) {
      const usuarioExiste = await prisma.users.findUnique({
        where: { id: id_user },
      });
      if (!usuarioExiste) {
        res.status(400).json({ error: "Usuário não encontrado" });
        return;
      }
    }

    const novoVeiculo = await prisma.vehicles.create({
      data: {
        model,
        year,
        daily_price,
        id_brand,
        id_category,
        id_user,
      },
      include: {
        brand: true,
        category: true,
        user: true,
      },
    });

    res.status(201).json(novoVeiculo);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao criar veículo" });
  }
};

export const updateVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    model,
    year,
    daily_price,
    id_brand,
    id_category,
    id_user,
  }: IVehicles = req.body;

  try {
    const veiculoExiste = await prisma.vehicles.findUnique({
      where: { id: parseInt(id) },
    });

    if (!veiculoExiste) {
      res.status(404).json({ error: "Veículo não encontrado" });
    }

    if (id_brand) {
      const marcaExiste = await prisma.brands.findUnique({
        where: { id: id_brand },
      });
      if (!marcaExiste) {
        res.status(400).json({ error: "Marca não encontrada" });
      }
    }

    if (id_category) {
      const categoriaExiste = await prisma.categorys.findUnique({
        where: { id: id_category },
      });
      if (!categoriaExiste) {
        res.status(400).json({ error: "Categoria não encontrada" });
      }
    }

    if (id_user) {
      const usuarioExiste = await prisma.users.findUnique({
        where: { id: id_user },
      });
      if (!usuarioExiste) {
        res.status(400).json({ error: "Usuário não encontrado" });
        return;
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
        id_user,
      },
    });
    res.json(veiculoAtualizado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar veículo" });
  }
};

export const deleteVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.vehicles.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send({ message: "Veículo excluido com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir veículo" });
  }
};
