import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Criar usuários (1 admin e 1 normal)
  const password = await bcrypt.hash("senha123", 10);

  const users = await Promise.all([
    prisma.users.create({
      data: {
        name: "Usuário Admin",
        email: "admin@test.com",
        password,
        isAdmin: true,
      },
    }),
    prisma.users.create({
      data: {
        name: "Usuário Normal",
        email: "user@test.com",
        password,
        isAdmin: false,
      },
    }),
  ]);

  // Marcas populares no Brasil
  const marcasNomes = [
    "Fiat",
    "Volkswagen",
    "Chevrolet",
    "Toyota",
    "Hyundai",
    "Renault",
    "Honda",
    "Ford",
    "Jeep",
    "Peugeot",
  ];

  // Categorias comuns
  const categoriasDescricoes = [
    "Hatch",
    "Sedan",
    "SUV",
    "Picape",
    "Minivan",
    "Conversível",
    "Crossover",
    "Perua",
    "Coupé",
    "Elétrico",
  ];

  // Modelos com seus respectivos anos de lançamento e preços base
  const modelosVeiculos = [
    { nome: "Onix", anoBase: 2012, precoBase: 120 },
    { nome: "HB20", anoBase: 2012, precoBase: 130 },
    { nome: "Corolla", anoBase: 2014, precoBase: 200 },
    { nome: "Argo", anoBase: 2017, precoBase: 150 },
    { nome: "Sandero", anoBase: 2013, precoBase: 110 },
    { nome: "Compass", anoBase: 2016, precoBase: 250 },
    { nome: "Civic", anoBase: 2015, precoBase: 220 },
    { nome: "Ranger", anoBase: 2011, precoBase: 300 },
    { nome: "208", anoBase: 2018, precoBase: 160 },
    { nome: "Creta", anoBase: 2016, precoBase: 230 },
  ];

  // Criar Marcas
  const marcas = await Promise.all(
    marcasNomes.map((nome) => prisma.brands.create({ data: { name: nome } }))
  );

  // Criar Categorias
  const categorias = await Promise.all(
    categoriasDescricoes.map((descricao) =>
      prisma.categorys.create({ data: { description: descricao } })
    )
  );

  // Criar Veículos com dados mais realistas
  const veiculos = await Promise.all(
    modelosVeiculos.map((modelo, index) => {
      const ano = modelo.anoBase + Math.floor(Math.random() * 5); // Variação de até 5 anos
      const preco_diaria = modelo.precoBase + Math.random() * 50; // Variação de até R$50

      return prisma.vehicles.create({
        data: {
          model: modelo.nome,
          year: ano,
          daily_price: Number(preco_diaria.toFixed(2)),
          id_brand: marcas[index % marcas.length].id,
          id_category: categorias[index % categorias.length].id,
        },
      });
    })
  );

  console.log("✅ Seed concluída com sucesso!");
  console.log(`👤 Usuários criados: ${users.length} (1 admin e 1 normal)`);
  console.log(`🚗 Veículos criados: ${veiculos.length}`);
  console.log(`🏷️ Marcas criadas: ${marcas.length}`);
  console.log(`📦 Categorias criadas: ${categorias.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
