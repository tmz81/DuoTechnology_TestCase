*ATENÇÃO* VALIDADO APENAS EM (UBUNTU 24.04)

Para criar o banco de dados utilizando o container docker, basta seguir o passo a passo 

## 🐘 Criar um container PostgreSQL com Docker

```bash
docker run -d \
  --name vehicles_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=senha123 \
  -e POSTGRES_DB=vehicles_db \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  postgres:15
```
## 🔁 Comandos úteis para esse container

```bash
docker ps
docker ps -a
docker start vehicles_db
docker stop vehicles_db
```