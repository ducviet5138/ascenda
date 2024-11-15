import { IHotel } from "../data";

export interface IHotelService {
  // Data
  data: IHotel[];

  get: () => IHotel[];
  setAndMerge: (data: IHotel[]) => void;
  find: (hotelIds: string[], destinationIds: number[]) => string;
}
