
-- Criação do banco de dados
CREATE DATABASE locadora_veiculos;

-- Seleciona o banco de dados
\c locadora_veiculos;

-- Criação da tabela marcas
CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Criação da tabela categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

-- Criação da tabela veiculos
CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    preco_diaria DECIMAL(10, 2) NOT NULL,
    id_marca INT NOT NULL,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_marca) REFERENCES marcas (id),
    FOREIGN KEY (id_categoria) REFERENCES categorias (id)
);
