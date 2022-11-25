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
class UpdatePointUseCase {
  constructor(
    @inject("AuthenticateUser")
    private authenticateUser: AuthenticateUserRepository,

    @inject("PointsRepository")
    private pointsRepository: PointsRepository
  ) {}

  async execute(
    { entryOne, exitOne, entryTwo, exitTwo, isHoliday }: ICreatePointsDTO,
    pointId: string,
    totalHour: number
  ) {
    // const existUser = await this.authenticateUser.findUserById(userId);
    const existPoint = await this.pointsRepository.findPointById(pointId);

    if (!existPoint) {
      throw new AppError("Point not found");
    }

    const userId = existPoint.userId!;

    const point = await this.pointsRepository.updatePoint(
      {
        entryOne,
        exitOne,
        entryTwo,
        exitTwo,
        isHoliday,
      },
      pointId,
      userId
    );

    if (!entryOne || !entryTwo || !exitOne || !exitTwo) {
      return point;
    }

    const entryOneSplit = splitStringTime(entryOne);
    const exitOneSplit = splitStringTime(exitOne);
    const entryTwoSplit = splitStringTime(entryTwo);
    const exitTwoSplit = splitStringTime(exitTwo);

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
      pointId: existPoint.id,
    };

    await this.pointsRepository.updateBankBalancePoint(bankBalance, pointId);

    return;
  }
}

export { UpdatePointUseCase };
