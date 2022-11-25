import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { DeletePointUseCase } from "./DeletePointUseCase";

class DeletePointController {
  async handle(req: Request, res: Response) {
    const dataPointIdParams = z.object({
      pointId: z.string(),
    });

    const { pointId } = dataPointIdParams.parse(req.params);

    const deletePointUseCase = container.resolve(DeletePointUseCase);

    const result = await deletePointUseCase.execute(pointId);

    return res.json(result);
  }
}

export { DeletePointController };
