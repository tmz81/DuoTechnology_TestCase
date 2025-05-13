import axios, { AxiosError } from "axios";
import { ICategoria } from "../src/interfaces/ICategoria";
import { IMarca } from "../src/interfaces/IMarca";
import { IVeiculo } from "../src/interfaces/IVeiculo";

const API_BASE_URL = "http://localhost:3000";

async function testCategorias() {
  try {
    // Criar categoria
    const novaCategoria = await axios.post<ICategoria>(
      `${API_BASE_URL}/categorias`,
      {
        descricao: "SUV",
      }
    );
    console.log("Categoria criada:", novaCategoria.data);

    // Listar categorias
    const categorias = await axios.get<ICategoria[]>(
      `${API_BASE_URL}/categorias`
    );
    console.log("Todas as categorias:", categorias.data);

    // Atualizar categoria
    const categoriaAtualizada = await axios.put<ICategoria>(
      `${API_BASE_URL}/categorias/${novaCategoria.data.id}`,
      { descricao: "SUV Premium" }
    );
    console.log("Categoria atualizada:", categoriaAtualizada.data);

    // Buscar categoria por ID
    const categoria = await axios.get<ICategoria>(
      `${API_BASE_URL}/categorias/${novaCategoria.data.id}`
    );
    console.log("Categoria por ID:", categoria.data);

    // Criar marca
    const novaMarca = await axios.post<IMarca>(`${API_BASE_URL}/marcas`, {
      nome: "Toyota",
    });

    // Criar veículo
    const novoVeiculo = await axios.post<IVeiculo>(`${API_BASE_URL}/veiculos`, {
      modelo: "RAV4",
      ano: 2022,
      preco_diaria: 250.0,
      id_marca: novaMarca.data.id,
      id_categoria: novaCategoria.data.id,
    });
    console.log("Veículo criado:", novoVeiculo.data);

    // Tentar deletar categoria com veículo associado (deve falhar)
    try {
      await axios.delete(`${API_BASE_URL}/categorias/${novaCategoria.data.id}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(
        "Erro ao deletar categoria (esperado):",
        axiosError.response?.data
      );
    }

    // Deletar veículo
    await axios.delete(`${API_BASE_URL}/veiculos/${novoVeiculo.data.id}`);

    // Deletar categoria
    await axios.delete(`${API_BASE_URL}/categorias/${novaCategoria.data.id}`);
    console.log("Categoria deletada com sucesso");

    // Deletar marca
    await axios.delete(`${API_BASE_URL}/marcas/${novaMarca.data.id}`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Erro no teste:",
      axiosError.response?.data || axiosError.message
    );
  }
}

testCategorias();
