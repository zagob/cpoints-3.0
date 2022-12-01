import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { CreatePointsUseCase } from "./CreatePointsUseCase";

class CreatePointsController {
  async handle(req: Request, res: Response) {
    const dataPointsBody = z.object({
      entryOne: z.string(),
      exitOne: z.string(),
      entryTwo: z.string(),
      exitTwo: z.string(),
      isHoliday: z.boolean().optional(),
    });

    const dataUserIdParams = z.object({
      userId: z.string(),
    });

    const { entryOne, exitOne, entryTwo, exitTwo, isHoliday } =
      dataPointsBody.parse(req.body);

    const { userId } = dataUserIdParams.parse(req.params);

    const createPointsUseCase = container.resolve(CreatePointsUseCase);

    const result = await createPointsUseCase.execute(
      {
        entryOne,
        exitOne,
        entryTwo,
        exitTwo,
        isHoliday,
      },
      userId
    );

    return res.json(result);
  }
}

export { CreatePointsController };
