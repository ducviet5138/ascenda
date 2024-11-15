import { IHotel } from "../data";

export interface IBaseSupplier {
  // Data
  data: any[] | IHotel[];

  get: () => any[] | IHotel[];
  set: (data: any[] | IHotel[]) => void;

  endpoint: () => string;
  fetch: () => Promise<any[]>;
  parse: (data: any) => IHotel;
  parseAll: () => IHotel[];
  cleanData: () => void;
}
