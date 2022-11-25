import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateInfoUserDTO } from "../../dtos/ICreateInfoUserDTO";
import { AuthenticateUserRepository } from "../../infra/prisma/AuthenticateUserRepository";
import { InfoUserRepository } from "../../infra/prisma/InfoUserRepository";

@injectable()
export class CreateInfoUserUseCase {
  constructor(
    @inject("AuthenticateUser")
    private authenticateUser: AuthenticateUserRepository,

    @inject("InfoUser")
    private infoUser: InfoUserRepository
  ) {}
  async execute({
    totalHour,
    startHour,
    entryLunchHour,
    exitLunchHour,
    exitHour,
    idUser,
  }: ICreateInfoUserDTO) {
    if (
      !totalHour ||
      !entryLunchHour ||
      !exitHour ||
      !exitLunchHour ||
      !startHour
    ) {
      throw new AppError("Invalid value");
    }

    if (!idUser) {
      throw new AppError("not exist idUser params");
    }

    const userExist = await this.authenticateUser.findUserById(idUser);

    if (!userExist) {
      throw new AppError("User not found");
    }

    const infoUser = await this.infoUser.createInfoUser({
      totalHour,
      startHour,
      entryLunchHour,
      exitLunchHour,
      exitHour,
    });

    await this.authenticateUser.updateUser(idUser, infoUser.id);

    return infoUser;
  }
}
