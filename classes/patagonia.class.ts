import { IHotel } from "../interfaces";
import { BaseSupplier } from "./base-supplier.class";

export class Patagonia extends BaseSupplier {
  endpoint(): string {
    return "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia";
  }

  parse(data: any): IHotel {
    const hotel: IHotel = {
      id: data?.id,
      destination_id: data?.destination,
      name: data?.name,
      location: {
        lat: typeof data?.lat === 'number' ? data?.lat : undefined,
        lng: typeof data?.lng === 'number' ? data?.lng : undefined,
        address: data?.address,
        city: undefined,
        country: undefined,
      },
      description: data?.info,
      amenities: {
        general: undefined,
        room: [...(data?.amenities ?? [])],
      },
      images: {
        site: undefined,
        rooms: data?.images?.rooms.map((o: any) => {
          return {
            link: o?.url,
            description: o?.description
          }
        }),
        amenities: data?.images?.amenities.map((o: any) => {
            return {
              link: o?.url,
              description: o?.description
            }
          }),
      },
      booking_conditions: undefined,
    };

    return hotel;
  }
}
