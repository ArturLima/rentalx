import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === id && !rental.end_date
    );
  }
  async findOpenRentalByUser(id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === id && !rental.end_date
    );
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });
    this.rentals.push(rental);
    return rental;
  }
}

export { RentalsRepositoryInMemory };