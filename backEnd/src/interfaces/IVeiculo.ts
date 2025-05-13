import { ICategoria } from "./ICategoria";
import { IMarca } from "./IMarca";

export interface IVeiculo {
  id?: number;
  modelo: string;
  ano: number;
  preco_diaria: number;
  id_marca: number;
  id_categoria: number;
}

export interface IVeiculoComRelacionamentos extends IVeiculo {
  marca?: IMarca;
  categoria?: ICategoria;
}
