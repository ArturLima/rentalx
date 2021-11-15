import { Specification } from "../entities/Specification";

interface ICreateSPecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ description, name }: ICreateSPecificationDTO): Promise<void>;

  findByName(name: string): Promise<Specification>;
}
export { ISpecificationRepository, ICreateSPecificationDTO };
