import { BankPointsBalance, Points } from "@prisma/client";
import { ICreateBankBalancePointDTO } from "../dtos/ICreateBankBalancePointDTO";
import { ICreatePointsDTO } from "../dtos/ICreatePointsDTO";
import { GetPointByMonthDTO } from "../dtos/IGetPointByMonthDTO";
import {
  BankBalancePointProps,
  IUpdatePointDTO,
} from "../dtos/IUpdatePointDTO";

interface IPointsRepository {
  createPoint(data: ICreatePointsDTO, userId: string): Promise<Points>;
  findPointById(pointId: string): Promise<Points | null>;
  deletePoint(pointId: string): Promise<void>;
  createBankBalancePoint(
    data: ICreateBankBalancePointDTO
  ): Promise<BankPointsBalance>;
  updatePoint(
    data: IUpdatePointDTO,
    pointId: string,
    userId: string
  ): Promise<void>;
  updateBankBalancePoint(
    data: BankBalancePointProps,
    pointId: string
  ): Promise<void>;
  getPointsByMonth(
    userId: string,
    year: string,
    month: string
  ): Promise<GetPointByMonthDTO[] | []>;
  getAllPointsByUser(userId: string): Promise<Points[]>;
}

export { IPointsRepository };
