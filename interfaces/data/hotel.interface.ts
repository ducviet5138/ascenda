import { ILocation } from "./location.interface";
import { IImages } from "./images.interface";
import { IAmenities } from "./amenities.interface";

export interface IHotel {
  id: string;
  destination_id: number;
  name: string;
  location?: ILocation;
  description?: string;
  amenities?: IAmenities;
  images?: IImages;
  booking_conditions?: string[];
}
