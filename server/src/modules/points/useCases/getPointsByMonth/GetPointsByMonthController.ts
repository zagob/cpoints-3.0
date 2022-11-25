import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { GetPointsByMonthUseCase } from "./GetPointsByMonthUseCase";

class GetPointsByMonthController {
  async handle(req: Request, res: Response) {
    const dataPointQuery = z.object({
      userId: z.string(),
      year: z.string(),
      month: z.string(),
    });

    const { userId, year, month } = dataPointQuery.parse(req.query);

    const getPointsByMonthUseCase = container.resolve(GetPointsByMonthUseCase);

    const result = await getPointsByMonthUseCase.execute(userId, year, month);

    return res.json(result);
  }
}

export { GetPointsByMonthController };
