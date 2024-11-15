import { IHotel } from "../interfaces";
import { BaseSupplier } from "./base-supplier.class";

export class Paperflies extends BaseSupplier {
  endpoint(): string {
    return "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies";
  }

  parse(data: any): IHotel {
    const hotel: IHotel = {
      id: data?.hotel_id,
      destination_id: data?.destination_id,
      name: data?.hotel_name,
      location: {
        lat: undefined,
        lng: undefined,
        address: data?.location?.address,
        city: undefined,
        country: data?.location?.country,
      },
      description: data?.details,
      amenities: data?.amenities,
      images: {
        amenities: undefined,
        rooms: data?.images?.rooms.map((o: any) => {
          return {
            link: o?.link,
            description: o?.caption
          }
        }),
        site: data?.images?.site.map((o: any) => {
          return {
            link: o?.link,
            description: o?.caption
          }
        }),
      },
      booking_conditions: data?.booking_conditions,
    };

    return hotel;
  }
}
