import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { PointsRepository } from "../../infra/prisma/PointsRepository";

@injectable()
class DeletePointUseCase {
  constructor(
    @inject("PointsRepository")
    private pointsRepository: PointsRepository
  ) {}

  async execute(pointId: string) {
    const existPoint = await this.pointsRepository.findPointById(pointId);

    if (!existPoint) {
      throw new AppError("Point not found");
    }

    await this.pointsRepository.deletePoint(pointId);

    return;
  }
}

export { DeletePointUseCase };
