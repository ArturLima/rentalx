import { Request, Response } from "express";

import { CreateSpecificationUseCases } from "./CreateSpecificationUseCase";
import { container } from "tsyringe";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, name } = request.body;
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCases
    );
    await createSpecificationUseCase.execute({ description, name });

    return response.status(201).send();
  }
}
export { CreateSpecificationController };
