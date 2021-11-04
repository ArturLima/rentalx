import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCases } from "./CreateSpecificationUseCase";

const specificationRepository = SpecificationRepository.getInstance();

const CreateSpecificationUseCase = new CreateSpecificationUseCases(
  specificationRepository
);

const createSpecificationController = new CreateSpecificationController(
  CreateSpecificationUseCase
);

export { createSpecificationController };
