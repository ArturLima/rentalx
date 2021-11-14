import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationrepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCases {
  constructor(private specificationRepository: ISpecificationRepository) {}
  execute({ description, name }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new Error("specification already exists");
    }
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
      created_at: new Date(),
    });

    this.specificationRepository.create(specification);
  }
}

export { CreateSpecificationUseCases };
