import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { UpdateInfoUserUseCase } from "./UpdateInfoUserUseCase";

class UpdateInfoUserController {
  async handle(req: Request, res: Response) {
    const updateInfoUserBody = z.object({
      totalHour: z.string(),
      entryLunchHour: z.string(),
      exitHour: z.string(),
      exitLunchHour: z.string(),
      startHour: z.string(),
    });
    const idInfoUserParams = z.object({
      id: z.string(),
    });
    const { totalHour, startHour, entryLunchHour, exitLunchHour, exitHour } =
      updateInfoUserBody.parse(req.body);

    const { id } = idInfoUserParams.parse(req.params);

    const authenticateUserUseCase = container.resolve(UpdateInfoUserUseCase);

    const result = await authenticateUserUseCase.execute({
      totalHour,
      startHour,
      entryLunchHour,
      exitLunchHour,
      exitHour,
      id,
    });

    return res.json(result);
  }
}

export { UpdateInfoUserController };
