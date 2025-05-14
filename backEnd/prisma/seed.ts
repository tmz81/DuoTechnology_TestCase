import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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

  // Modelos populares (nomes genéricos, que serão usados em veículos)
  const modelosPopulares = [
    "Onix",
    "HB20",
    "Corolla",
    "Argo",
    "Sandero",
    "Compass",
    "Civic",
    "Ranger",
    "208",
    "Creta",
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

  // Criar Veículos
  for (let i = 0; i < 10; i++) {
    const modelo = modelosPopulares[i];
    const ano = 2015 + Math.floor(Math.random() * 10); // entre 2015 e 2024
    const preco_diaria = (100 + Math.random() * 200).toFixed(2); // entre R$100 e R$300

    await prisma.vehicles.create({
      data: {
        model: modelo,
        year: ano,
        daily_price: Number(preco_diaria),
        id_brand: marcas[i % marcas.length].id,
        id_category: categorias[i % categorias.length].id,
      },
    });
  }

  console.log("✅ Seed com dados realistas concluída com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
