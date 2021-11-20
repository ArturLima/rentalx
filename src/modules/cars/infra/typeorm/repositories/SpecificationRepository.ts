import { getRepository, Repository } from "typeorm";

import {
  ICreateSPecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationrepository";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;
  private static INSTANCE: SpecificationRepository;
  constructor() {
    this.repository = getRepository(Specification);
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  async create({ description, name }: ICreateSPecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({ name });
  }
}

export { SpecificationRepository };
