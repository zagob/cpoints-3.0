import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const authenticateUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = authenticateUserBody.parse(req.body);

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const result = await authenticateUserUseCase.execute({
      access_token,
    });

    return res.json(result);
  }
}
