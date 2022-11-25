import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { AuthenticateUserRepository } from "../../../users/infra/prisma/AuthenticateUserRepository";
import { PointsRepository } from "../../infra/prisma/PointsRepository";

@injectable()
class GetPointsByMonthUseCase {
  constructor(
    @inject("AuthenticateUser")
    private authenticateUser: AuthenticateUserRepository,

    @inject("PointsRepository")
    private pointsRepository: PointsRepository
  ) {}

  async execute(userId: string, year: string, month: string) {
    const date = new Date();
    const existUser = await this.authenticateUser.findUserById(userId);

    if (!existUser) {
      throw new AppError("Point not found");
    }

    if (Number(year) > date.getFullYear()) {
      throw new AppError("You must be enable recent year");
    }

    if (Number(month) > date.getMonth() + 1) {
      throw new AppError("You must be enable recent month");
    }

    if (Number(month) > 12) {
      throw new AppError("Is not mounth valid");
    }

    const points = await this.pointsRepository.getPointsByMonth(
      userId,
      year,
      month
    );

    return points;
  }
}

export { GetPointsByMonthUseCase };
