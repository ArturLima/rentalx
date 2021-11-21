import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar(id: string): Promise<Rental>;
  findOpenRentalByUser(id: string): Promise<Rental>;
  create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
