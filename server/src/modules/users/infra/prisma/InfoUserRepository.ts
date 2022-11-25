import { InfoUser } from "@prisma/client";
import { prisma } from "../../../../infra/database/prismaClient";
import { ICreateInfoUserDTO } from "../../dtos/ICreateInfoUserDTO";
import { IUpdateInfoUserDTO } from "../../dtos/IUpdateInfoUserDTO";
import { IInfoUserRepository } from "../../repositories/IInfoUserRepository";

class InfoUserRepository implements IInfoUserRepository {
  async updateInfoUser(data: IUpdateInfoUserDTO): Promise<void> {
    await prisma.infoUser.updateMany({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async createInfoUser(data: ICreateInfoUserDTO): Promise<InfoUser> {
    const userInfo = await prisma.infoUser.create({
      data,
    });

    return userInfo;
  }
}

export { InfoUserRepository };
