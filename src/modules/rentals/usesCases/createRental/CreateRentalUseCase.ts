import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/erros/Apperror";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
//@injectable()
class CreateRentalUseCase {
  constructor(
    /* @inject("") */ private rentalsRepository: IRentalsRepository,
    /* @inject("") */ private dateProvider: IDateProvider
  ) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("there's a rental in progress for user!");
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (compare < minimumHour) {
      throw new AppError("invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });
    return rental;
  }
}

export { CreateRentalUseCase };