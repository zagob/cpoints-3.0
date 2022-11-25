import { container } from "tsyringe";
import { PointsRepository } from "../../../modules/points/infra/prisma/PointsRepository";
import { IPointsRepository } from "../../../modules/points/repositories/IPointsRepository";
import { AuthenticateUserRepository } from "../../../modules/users/infra/prisma/AuthenticateUserRepository";
import { InfoUserRepository } from "../../../modules/users/infra/prisma/InfoUserRepository";
import { IAuthenticateUserRepository } from "../../../modules/users/repositories/IAuthenticateUserRepository";
import { IInfoUserRepository } from "../../../modules/users/repositories/IInfoUserRepository";

container.registerSingleton<IAuthenticateUserRepository>(
  "AuthenticateUser",
  AuthenticateUserRepository
);

container.registerSingleton<IInfoUserRepository>(
  "InfoUser",
  InfoUserRepository
);

container.registerSingleton<IPointsRepository>(
  "PointsRepository",
  PointsRepository
);
