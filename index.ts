import { Acme } from "./classes/acme.class";
import { Paperflies } from "./classes/paperflies.class";
import { Patagonia } from "./classes/patagonia.class";
import { IBaseSupplier, IHotel, IHotelService } from "./interfaces";
import { HotelService } from "./services";
import { Command } from "commander";

async function fetch_hotels(
  hotelIds: string[],
  destinationIds: number[],
): Promise<string> {
  const suppliers: IBaseSupplier[] = [
    new Acme(),
    new Patagonia(),
    new Paperflies(),
  ];

  for (const supplier of suppliers) {
    const hotels = await supplier.fetch();
    supplier.set(hotels);
    supplier.set(supplier.parseAll());
    supplier.cleanData();
  }

  const hotels: IHotel[] = suppliers.map((o: IBaseSupplier) => o.get()).flat();
  const hotelService: IHotelService = new HotelService();
  hotelService.setAndMerge(hotels);

  return hotelService.find(hotelIds, destinationIds);
}

async function main(hotelIds: string[], destinationIds: number[]) {
  const hotels = await fetch_hotels(hotelIds, destinationIds);
  console.log(hotels);
}

// Handle args
const program = new Command();

program
  .name("my_hotel_merger")
  .arguments("<hotel_ids> <destination_ids>")
  .description("Merge hotel data by hotel and destination IDs")
  .action((hotel_ids: string, destination_ids: string) => {
    // Parse hotel IDs as strings
    const hotelIds = hotel_ids === "none" ? [] : hotel_ids.split(",");

    // Parse destination IDs as numbers
    const destinationIds =
      destination_ids === "none"
        ? []
        : destination_ids.split(",").map((id) => Number(id));

    main(hotelIds, destinationIds);
  });

// Parse command-line arguments
program.parse(process.argv);
