import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserCase } from "./CreateUserCase";
class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license } = request.body;
    const createUseCase = container.resolve(CreateUserCase);
    await createUseCase.execute({
      name,
      password,
      email,
      driver_license,
    });
    return response.status(201).send();
  }
}

export { CreateUserController };
