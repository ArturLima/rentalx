import { Specification } from "../entities/Specification";

interface ICreateSPecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ description, name }: ICreateSPecificationDTO): void;

  findByName(name: string): Specification;
}
export { ISpecificationRepository, ICreateSPecificationDTO };
