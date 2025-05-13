import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ExtendedPrismaClient = typeof prisma;
