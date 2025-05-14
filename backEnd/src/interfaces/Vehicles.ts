import { ICategorys } from "./ICategorys";
import { IBrands } from "./IBrands";
import { IUsers } from "./IUsers";

export interface IVehicles {
  id?: number;
  model: string;
  year: number;
  daily_price: number;
  id_brand: number;
  id_category: number;
  id_user?: number | null;
}

export interface IVehiculesWithRelations extends IVehicles {
  brand?: IBrands;
  category?: ICategorys;
  user?: IUsers | null;
}
