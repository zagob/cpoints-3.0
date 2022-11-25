import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import {
  convertToMinutes,
  convertToTimeString,
  differenceInMinutes,
  splitStringTime,
} from "../../../../utils/timeTransform";
import { AuthenticateUserRepository } from "../../../users/infra/prisma/AuthenticateUserRepository";
import { ICreatePointsDTO } from "../../dtos/ICreatePointsDTO";
import { PointsRepository } from "../../infra/prisma/PointsRepository";

@injectable()
class CreatePointsUseCase {
  constructor(
    @inject("AuthenticateUser")
    private authenticateUser: AuthenticateUserRepository,

    @inject("PointsRepository")
    private pointsRepository: PointsRepository
  ) {}

  async execute(
    { entryOne, exitOne, entryTwo, exitTwo, isHoliday }: ICreatePointsDTO,
    userId: string,
    totalHour: number
  ) {
    const existUser = await this.authenticateUser.findUserById(userId);

    if (!existUser) {
      throw new AppError("User not found");
    }

    const point = await this.pointsRepository.createPoint(
      {
        entryOne,
        exitOne,
        entryTwo,
        exitTwo,
        isHoliday,
      },
      userId
    );

    if (
      !point.entryOne ||
      !point.entryTwo ||
      !point.exitOne ||
      !point.exitTwo
    ) {
      return point;
    }

    const entryOneSplit = splitStringTime(point.entryOne);
    const exitOneSplit = splitStringTime(point.exitOne);
    const entryTwoSplit = splitStringTime(point.entryTwo);
    const exitTwoSplit = splitStringTime(point.exitTwo);

    const minutesMorning = differenceInMinutes(
      convertToMinutes(entryOneSplit.hours, entryOneSplit.minutes),
      convertToMinutes(exitOneSplit.hours, exitOneSplit.minutes)
    );

    const minutesLunch = differenceInMinutes(
      convertToMinutes(exitOneSplit.hours, exitOneSplit.minutes),
      convertToMinutes(entryTwoSplit.hours, entryTwoSplit.minutes)
    );

    const minutesAfternoon = differenceInMinutes(
      convertToMinutes(entryTwoSplit.hours, entryTwoSplit.minutes),
      convertToMinutes(exitTwoSplit.hours, exitTwoSplit.minutes)
    );

    const totalTimePoint = minutesMorning + minutesAfternoon - totalHour;

    const bankBalance = {
      timeMorning: convertToTimeString(minutesMorning),
      lunch: convertToTimeString(minutesLunch),
      timeAfternoon: convertToTimeString(minutesAfternoon),
      totalTimePoint: convertToTimeString(Math.abs(totalTimePoint)),
      statusPoint: (Math.sign(totalTimePoint) === 1
        ? "UP"
        : Math.sign(totalTimePoint) === -1
        ? "DOWN"
        : "EQUAL") as "UP" | "DOWN" | "EQUAL",
      pointId: point.id,
    };

    await this.pointsRepository.createBankBalancePoint(bankBalance);

    const data = {
      ...point,
      bankPointBalance: bankBalance,
    };

    return data;
  }
}

export { CreatePointsUseCase };
