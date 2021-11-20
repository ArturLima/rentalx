import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/erros/Apperror";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect");
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }
    const token = sign({}, "2d4c7f5f551a1ee0a70c219641239ae6", {
      subject: user.id,
      expiresIn: "1d",
    });
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
export { AuthenticateUserUseCase };
