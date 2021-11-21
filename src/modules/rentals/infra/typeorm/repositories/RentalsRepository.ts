import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalRepository implements IRentalsRepository {
  findOpenRentalByCar(id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByUser(id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}

export { RentalRepository };
