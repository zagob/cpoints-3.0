import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUpdateInfoUserDTO } from "../../dtos/IUpdateInfoUserDTO";
import { InfoUserRepository } from "../../infra/prisma/InfoUserRepository";

@injectable()
export class UpdateInfoUserUseCase {
  constructor(
    @inject("InfoUser")
    private infoUser: InfoUserRepository
  ) {}
  async execute({
    totalHour,
    startHour,
    entryLunchHour,
    exitLunchHour,
    exitHour,
    id,
  }: IUpdateInfoUserDTO) {
    if (!id) {
      throw new AppError("Id infoUser required");
    }

    await this.infoUser.updateInfoUser({
      totalHour,
      startHour,
      entryLunchHour,
      exitLunchHour,
      exitHour,
      id,
    });
  }
}
