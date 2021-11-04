import { ISpecificationRepository } from "../repositories/ISpecificationrepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationRepository) {}
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }
    this.specificationRepository.create({
      description,
      name,
    });
  }
}

export { CreateSpecificationService };
