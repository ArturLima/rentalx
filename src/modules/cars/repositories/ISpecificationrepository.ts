import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSPecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({
    description,
    name,
  }: ICreateSPecificationDTO): Promise<Specification>;

  findByName(name: string): Promise<Specification>;

  findByIds(ids: string[]): Promise<Specification[]>;
}
export { ISpecificationRepository, ICreateSPecificationDTO };
