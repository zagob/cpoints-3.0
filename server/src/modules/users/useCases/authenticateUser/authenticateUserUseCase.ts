import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";
import { urlApi } from "../../../../services/axios";
import { AuthenticateUserRepository } from "../../infra/prisma/AuthenticateUserRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { AxiosError } from "axios";

interface IAuthenticateUser {
  access_token: string;
}

interface dataUserProps {
  id: string;
  email: string;
  picture: string;
  name: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("AuthenticateUser")
    private authenticateUser: AuthenticateUserRepository
  ) {}
  async execute({ access_token }: IAuthenticateUser) {
    let dataUser = null || ({} as dataUserProps);

    await urlApi
      .get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        dataUser = data;
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          throw new AppError("Unauthorized, token invalid", 401);
        }
      });

    const existUser = await this.authenticateUser.findByEmail(dataUser.email);

    if (!existUser) {
      await this.authenticateUser.createUser({
        googleId: dataUser.id,
        email: dataUser.email,
        avatar_url: dataUser.picture,
        name: dataUser.name,
      });
    }

    const token = jwt.sign(
      {
        name: dataUser?.name,
        avatar_url: dataUser?.picture,
      },
      "12345",
      {
        subject: dataUser?.id,
        expiresIn: "1d",
      }
    );

    const user = await this.authenticateUser.findUserByGoogleId(dataUser.id);
    return { token, user };
  }
}
