import { BankPointsBalance, Points, Prisma } from "@prisma/client";
import { prisma } from "../../../../infra/database/prismaClient";
import { ICreateBankBalancePointDTO } from "../../dtos/ICreateBankBalancePointDTO";
import { ICreatePointsDTO } from "../../dtos/ICreatePointsDTO";
import {
  BankBalancePointProps,
  IUpdatePointDTO,
} from "../../dtos/IUpdatePointDTO";
import { IPointsRepository } from "../../repositories/IPointsRepository";

import { GetPointByMonthDTO } from "../../dtos/IGetPointByMonthDTO";
import {
  convertToMinutes,
  splitStringTime,
} from "../../../../utils/timeTransform";

interface PointsProps extends Points {
  bankPointBalance: {
    totalTimePoint: string;
    statusPoint: string;
  };
}

class PointsRepository implements IPointsRepository {
  async getAllPointsByUser(userId: string): Promise<PointsProps[]> {
    const points = await prisma.points.findMany({
      where: {
        userId,
      },
      select: {
        datetime: true,
        bankPointBalance: {
          select: {
            totalTimePoint: true,
            statusPoint: true,
          },
        },
      },
    });

    return points as PointsProps[];
  }
  async getPointsByMonth(
    userId: string,
    year: string,
    month: string
  ): Promise<GetPointByMonthDTO[] | []> {
    const date = new Date(Number(year), Number(month) - 1);
    const date2 = new Date(Number(year), Number(month), 0);

    const points = await prisma.points.findMany({
      where: {
        userId,
        datetime: {
          gte: date.toISOString(),
          lte: date2.toISOString(),
        },
      },
      select: {
        id: true,
        entryOne: true,
        exitOne: true,
        entryTwo: true,
        exitTwo: true,
        isHoliday: true,
        datetime: true,
        bankPointBalance: {
          select: {
            id: true,
            timeMorning: true,
            lunch: true,
            timeAfternoon: true,
            totalTimePoint: true,
            statusPoint: true,
          },
        },
      },
    });

    return points;
  }
  async deletePoint(pointId: string): Promise<void> {
    await prisma.bankPointsBalance.delete({
      where: {
        pointId,
      },
    });
    await prisma.points.delete({
      where: {
        id: pointId,
      },
    });
  }
  async updateBankBalancePoint(
    data: BankBalancePointProps,
    pointId: string
  ): Promise<void> {
    await prisma.bankPointsBalance.update({
      where: {
        pointId,
      },
      data,
    });
  }
  async findPointById(pointId: string): Promise<Points | null> {
    const point = await prisma.points.findFirst({
      where: {
        id: pointId,
      },
    });

    return point;
  }
  async updatePoint(
    data: IUpdatePointDTO,
    pointId: string,
    userId: string
  ): Promise<void> {
    await prisma.points.update({
      where: {
        id: pointId,
      },
      data,
    });
  }
  async createBankBalancePoint(
    data: ICreateBankBalancePointDTO
    // pointId: string
  ): Promise<BankPointsBalance> {
    const bankBalancePoint = await prisma.bankPointsBalance.create({
      data,
    });

    return bankBalancePoint;
  }
  async createPoint(data: ICreatePointsDTO, userId: string): Promise<Points> {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const datetime = new Date(year, month, day).toISOString();
    const point = await prisma.points.create({
      data: {
        ...data,
        userId,
        datetime,
      },
    });

    return point;
  }
}

export { PointsRepository };
