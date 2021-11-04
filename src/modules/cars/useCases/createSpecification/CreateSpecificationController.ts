import { Request, Response } from "express";

import { CreateSpecificationUseCases } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(
    private createSpecificationUseCase: CreateSpecificationUseCases
  ) {}
  handle(request: Request, response: Response): Response {
    const { description, name } = request.body;

    this.createSpecificationUseCase.execute({ description, name });

    return response.status(201).send();
  }
}
export { CreateSpecificationController };
