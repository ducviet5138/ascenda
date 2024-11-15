import { IBaseSupplier, IHotel } from "../interfaces";

export abstract class BaseSupplier implements IBaseSupplier {
  data: any[] | IHotel[];

  constructor() {
    this.data = [];
  }

  get(): any[] | IHotel[] {
    return this.data;
  }

  set(data: any[] | IHotel[]): void {
    this.data = data;
  }

  async fetch(): Promise<any[]> {
    const endpoint: string = this.endpoint();
    const rawResponse = await fetch(endpoint);
    return rawResponse.json();
  }

  parseAll(): IHotel[] {
    return this.data.map((o: any) => this.parse(o));
  }

  cleanData(): void {
    this.data = this.data?.map((o: any) => {
      return {
        ...o,
        amenities: {
          general: o?.amenities?.general
            ? o.amenities.general.map((s: string) => s.trim().toLowerCase())
            : undefined,
          room: o?.amenities?.room
            ? o.amenities.room.map((s: string) => s.trim().toLowerCase())
            : undefined,
        },
      };
    });
  }

  abstract endpoint(): string;
  abstract parse(data: object): IHotel;
}
