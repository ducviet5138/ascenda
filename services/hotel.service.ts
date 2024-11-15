import { IHotel, IHotelService } from "../interfaces";
import _ from "lodash";

export class HotelService implements IHotelService {
  data: IHotel[];

  constructor() {
    this.data = [];
  }

  get(): IHotel[] {
    return this.data;
  }


  static deepMerge(target: any, source: any): any {
    return _.mergeWith(target, source, (objValue: any, srcValue: any) => {
      if (Array.isArray(objValue)) {
        return _.unionWith(objValue, srcValue, _.isEqual);
      }
    });
  }

  setAndMerge(data: IHotel[]): void {
    const hotels = new Map<string, IHotel>();

    data.forEach((newHotel) => {
      const key = `${newHotel.id}_${newHotel.destination_id}`;
      const existingHotel = hotels.get(key);

      if (existingHotel) {
        const mergedHotel = HotelService.deepMerge(existingHotel, newHotel);
        hotels.set(key, mergedHotel);
      } else {
        hotels.set(key, { ...newHotel });
      }
    });

    this.data = Array.from(hotels.values());
  }

  find(hotelIds: string[], destinationIds: number[]): string {
    const hotels = this.data.filter((hotel) => {
      const isHotelIdMatch =
        hotelIds.length === 0 || hotelIds.includes(hotel.id);
      const isDestinationIdMatch =
        destinationIds.length === 0 ||
        destinationIds.includes(hotel.destination_id);
      return isHotelIdMatch && isDestinationIdMatch;
    });

    return JSON.stringify(hotels);
  }
}
