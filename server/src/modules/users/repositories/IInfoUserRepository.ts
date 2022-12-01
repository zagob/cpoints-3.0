import { InfoUser } from "@prisma/client";
import { ICreateInfoUserDTO } from "../dtos/ICreateInfoUserDTO";
import { IUpdateInfoUserDTO } from "../dtos/IUpdateInfoUserDTO";

interface IInfoUserRepository {
  createInfoUser(data: ICreateInfoUserDTO): Promise<InfoUser>;
  updateInfoUser(data: IUpdateInfoUserDTO): Promise<void>;
  findInfoUserById(infoUserId: string): Promise<InfoUser | null>;
}

export { IInfoUserRepository };
