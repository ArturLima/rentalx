import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });
    this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(id: string): Promise<Rental> {
    return await this.repository.findOne({ car_id: id });
  }
  async findOpenRentalByUser(id: string): Promise<Rental> {
    return await this.repository.findOne({ id });
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id);
  }
}

export { RentalRepository };
