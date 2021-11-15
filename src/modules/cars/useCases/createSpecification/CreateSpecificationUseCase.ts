import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../erros/Apperror";
import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationrepository";

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
