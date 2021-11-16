import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../erros/Apperror";

@injectable()
class CreateUserCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }
    const passwordHash = await hash(password, 8);
    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
      avatar,
      id,
    });
  }
}
export { CreateUserCase };
