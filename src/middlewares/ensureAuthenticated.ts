import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../erros/Apperror";

import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "2d4c7f5f551a1ee0a70c219641239ae6"
    ) as IPayload;

    const usersRepository = new UserRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
