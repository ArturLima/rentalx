import { AppError } from "@shared/erros/Apperror";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationrepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCases {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new AppError("specification already exists");
    }

    await this.specificationRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCases };
