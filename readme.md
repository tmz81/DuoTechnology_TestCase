# Duo_Technology Test Case

Esta aplicação FullStack simples consiste em gestão de veículos, marcas e categorias, com:

## ✅ Funcionalidades

- Login e cadastro com JWT (Encryption)
- Controle de acesso por perfil (User/Admin)
- CRUD de veículos, marcas e categorias
- Filtros e pesquisa
- Tela de Dashboard com resumo
- Interface mobile responsiva

## 🔧 Requisitos

- **Node.js:** `v20.11.0` (Recomendado usar [nvm](https://github.com/nvm-sh/nvm) ou [fnm](https://github.com/Schniz/fnm))
- **Yarn** ou **npm**
- **Docker + Docker Compose** (para banco de dados)
- **Expo CLI** (frontend mobile): `npm install -g expo-cli`
- **Prisma CLI:** `npx prisma`
- **Insomnia** (para testar API com `insomnia.json`)

* Backend: Node.js + Express + Prisma ORM + PostgreSQL
* Frontend: React Native + Expo
* Banco de dados: PostgreSQL em container Docker

## 📁 Estrutura do Projeto

```
├── backEnd       # Backend em Node.js (API REST com Prisma e JWT)
└── frontEnd      # Frontend mobile com React Native (Expo)
```

## 📂 Estrutura de Arquivos

```
backEnd/
├── prisma/                # Schema do banco e migrações
├── src/
│   ├── routes/            # Definição de rotas
│   ├── controllers/     # Lógica de negócio
│   └── prisma/           # Client do Prisma

frontEnd/
└── src/
    ├── screens/          # Telas da aplicação
    ├── services/         # Comunicação com API
    └── context/          # Gerenciamento de estado
```

## 🐳 Docker

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

> 🔁 Reinicie o terminal após o comando `usermod`.

### Windows

1. Acesse: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Baixe e instale o **Docker Desktop para Windows**.
3. Ative o **WSL 2** se for solicitado (link de instalação incluso no instalador).
4. Reinicie o sistema.

> ✅ Verifique com `docker --version` no terminal do PowerShell ou CMD.

### macOS

1. Acesse: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Baixe e instale o **Docker Desktop para Mac (Intel ou Apple Silicon)**.
3. Execute o app Docker após instalação.

> ✅ Verifique com `docker --version` no terminal.

---

## 🐘 Subindo o PostgreSQL com Docker

📦 Utilize o seguinte comando para criar e subir um container PostgreSQL configurado conforme o `docker-compose.yml`:

```bash
docker run -d --name vehicles_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=senha123 -e POSTGRES_DB=vehicles_db -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:15
```

> 💡 Essa configuração já cria o banco `vehicles_db` com usuário `postgres` e senha `senha123`.

🔗 **String de conexão** que será utilizada no backend (`Presente no .env`):

```
postgresql://postgres:senha123@localhost:5432/vehicles_db
```

### 🔁 Comandos úteis para o container

```bash
docker ps                 # Lista containers em execução
docker ps -a              # Lista todos os containers (ativos e inativos)
docker start vehicles_db  # Inicia o container
docker stop vehicles_db   # Para o container
```

## 🖥️ Instalação por Sistema Operacional

### Linux / macOS

```bash
# Clonar o projeto
git clone https://github.com/tmz81/DuoTechnology_TestCase.git
cd DuoTechnology_TestCase

# Backend
cd backEnd
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev

# Frontend
cd frontEnd
npm install
npx expo start
```

### Windows (PowerShell ou WSL)

```powershell
# Clonar o projeto
git clone https://github.com/tmz81/DuoTechnology_TestCase.git
cd DuoTechnology_TestCase

# Backend
cd .\backEnd
Copy-Item .env.example -Destination .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev


# Frontend
cd frontEnd
npm install
npx expo start
```

## 🧪 API Documentation

- Todas as coleções pré-configuradas
- Exemplos de requests
- Ambiente configurado com variáveis

1. Abra o Insomnia.
2. Importe o arquivo `insomnia.json` presente na raiz ou pasta utilitária.
3. Teste endpoints com diferentes usuários (admin e comum).
4. As variáveis de ambiente (`base_url`, `token`) já estão configuradas no arquivo.

As rotas estão organizadas por responsabilidade:

- `/auth/*`: login, registro, perfil
- `/brands/*`: gerenciamento de marcas
- `/categorys/*`: gerenciamento de categorias
- `/vehicles/*`: gerenciamento de veículos
- `/home`: dashboard

---

### Scripts principais do Prisma

```bash
npx prisma studio     # Interface web para o banco
npx prisma migrate    # Executa migrations
npx prisma db seed    # Roda o seed de dados iniciais
```
