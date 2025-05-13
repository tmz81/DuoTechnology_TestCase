# Case de Desenvolvimento Júnior #

Cenário: 
Você foi contratado por uma pequena empresa de e-commerce que está desenvolvendo uma nova funcionalidade para recomendar produtos aos clientes. Eles querem que você crie um algoritmo simples que sugira produtos similares baseados nas categorias dos produtos que os clientes já compraram.

Requisitos:
A empresa tem um banco de dados de produtos, onde cada produto tem uma categoria.
Quando um cliente faz uma compra, o sistema deve sugerir produtos de categorias semelhantes.
A solução deve ser desenvolvida em Node.js.
A sugestão de produtos deve levar em conta que não podem ser recomendados os produtos que o cliente já comprou.
A funcionalidade deve ser modular e testável.

Perguntas adicionais:
[ ] - Como você estruturaria o banco de dados para suportar essa funcionalidade?
[ ] - Qual seria sua abordagem para implementar e testar essa funcionalidade?
[ ] - Como você lidaria com possíveis problemas de desempenho conforme o número de produtos e categorias aumenta?


# Instruções para rodar o cases

## 1. Renomear o file `.env.example` para `.env`

## 2. Instal as dependências

```bash
npm install
```

## 3. Rodar a migration

```bash
npx prisma migrate dev --name init
```

## 4. Rodar o test

```bash
npm run test
```

## 5. Rodar o server

```bash
npm run dev
```

## 6. Rodar o prisma studio

```bash
npx prisma studio
```
