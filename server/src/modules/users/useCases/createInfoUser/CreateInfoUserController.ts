import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { CreateInfoUserUseCase } from "./CreateInfoUserUseCase";

class CreateInfoUserController {
  async handle(req: Request, res: Response) {
    const infoUserBody = z.object({
      totalHour: z.string(),
      entryLunchHour: z.string(),
      exitHour: z.string(),
      exitLunchHour: z.string(),
      startHour: z.string(),
    });
    const idUserParams = z.object({
      idUser: z.string(),
    });
    const { totalHour, startHour, entryLunchHour, exitLunchHour, exitHour } =
      infoUserBody.parse(req.body);

    const { idUser } = idUserParams.parse(req.params);

    const authenticateUserUseCase = container.resolve(CreateInfoUserUseCase);

    const result = await authenticateUserUseCase.execute({
      totalHour,
      startHour,
      entryLunchHour,
      exitLunchHour,
      exitHour,
      idUser,
    });

    return res.json(result);
  }
}

export { CreateInfoUserController };
