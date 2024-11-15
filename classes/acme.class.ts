import { IHotel } from "../interfaces";
import { BaseSupplier } from "./base-supplier.class";

export class Acme extends BaseSupplier {
  endpoint(): string {
    return "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme";
  }

  parse(data: any): IHotel {
    const hotel: IHotel = {
      id: data?.Id,
      destination_id: data?.DestinationId,
      name: data?.Name,
      location: {
        lat: typeof data?.Latitude === 'number' ? data?.Latitude : undefined,
        lng: typeof data?.Longitude === 'number' ? data?.Longitude : undefined,
        address: data?.Address,
        city: data?.City,
        country: data?.Country,
      },
      description: data?.Description,
      amenities: {
        general: [...(data?.Facilities ?? [])],
        room: undefined,
      },
      images: undefined,
      booking_conditions: data?.BookingConditions,
    };

    return hotel;
  }
}
