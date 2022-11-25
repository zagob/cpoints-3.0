import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { GetAllPointsByUserIdUseCase } from "./GetAllPointsByUserIdUseCase";

class GetAllPointsByUserIdController {
  async handle(req: Request, res: Response) {
    const userIdParams = z.object({
      userId: z.string(),
    });

    const dataYearQuery = z.object({
      year: z.string(),
    });

    const { userId } = userIdParams.parse(req.params);
    const { year } = dataYearQuery.parse(req.query);

    const getAllPointsByUserIdUseCase = container.resolve(
      GetAllPointsByUserIdUseCase
    );

    const result = await getAllPointsByUserIdUseCase.execute(
      userId,
      Number(year)
    );

    return res.json(result);
  }
}

export { GetAllPointsByUserIdController };
