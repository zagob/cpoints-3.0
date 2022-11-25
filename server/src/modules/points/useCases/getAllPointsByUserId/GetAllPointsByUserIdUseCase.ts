import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import {
  convertToMinutes,
  splitStringTime,
} from "../../../../utils/timeTransform";
import { AuthenticateUserRepository } from "../../../users/infra/prisma/AuthenticateUserRepository";
import { PointsRepository } from "../../infra/prisma/PointsRepository";

@injectable()
class GetAllPointsByUserIdUseCase {
  constructor(
    @inject("AuthenticateUser")
    private authenticateUser: AuthenticateUserRepository,

    @inject("PointsRepository")
    private pointsRepository: PointsRepository
  ) {}

  async execute(userId: string, year: number) {
    const existUser = await this.authenticateUser.findUserById(userId);

    if (!existUser) {
      throw new AppError("Point not found");
    }

    const points = await this.pointsRepository.getAllPointsByUser(userId);

    if (year > new Date().getFullYear()) {
      throw new AppError("Does not year recent date");
    }

    let arr = [];
    for (let i = 1; i <= 12; i++) {
      const filterPointsMonth = points.filter(
        (point) =>
          new Date(point.datetime).getFullYear() === year &&
          new Date(point.datetime).getMonth() + 1 === i
      );

      const totalMinutesMonth = filterPointsMonth.reduce((acc, value) => {
        const { hours, minutes } = splitStringTime(
          value.bankPointBalance?.totalTimePoint
        );
        const totalMinutes = convertToMinutes(hours, minutes);
        if (value.bankPointBalance?.statusPoint === "UP") {
          return acc + totalMinutes;
        }

        if (value.bankPointBalance?.statusPoint === "DOWN") {
          return acc - totalMinutes;
        }

        return acc;
      }, 0);

      arr.push(totalMinutesMonth);
    }

    return arr;
  }
}

export { GetAllPointsByUserIdUseCase };
