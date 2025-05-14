import { ICategorys } from "./ICategorys";
import { IBrands } from "./IBrands";

export interface IVehicles {
  id?: number;
  model: string;
  year: number;
  daily_price: number;
  id_brand: number;
  id_category: number;
}

export interface IVehiculesWithRelations extends IVehicles {
  brand?: IBrands;
  category?: ICategorys;
}
