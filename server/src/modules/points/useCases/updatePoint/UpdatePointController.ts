import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { UpdatePointUseCase } from "./UpdatePointUseCase";

class UpdatePointController {
  async handle(req: Request, res: Response) {
    const dataPointsBody = z.object({
      entryOne: z.string(),
      exitOne: z.string(),
      entryTwo: z.string(),
      exitTwo: z.string(),
      isHoliday: z.boolean().optional(),
      totalHour: z.number(),
    });

    const dataUserIdParams = z.object({
      pointId: z.string(),
    });

    const { entryOne, exitOne, entryTwo, exitTwo, isHoliday, totalHour } =
      dataPointsBody.parse(req.body);

    const { pointId } = dataUserIdParams.parse(req.params);

    const updatePointUseCase = container.resolve(UpdatePointUseCase);

    const result = await updatePointUseCase.execute(
      {
        entryOne,
        exitOne,
        entryTwo,
        exitTwo,
        isHoliday,
      },
      pointId,
      totalHour
    );

    return res.json(result);
  }
}

export { UpdatePointController };
