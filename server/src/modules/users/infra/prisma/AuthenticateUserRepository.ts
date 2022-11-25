import { InfoUser, User } from "@prisma/client";
import { prisma } from "../../../../infra/database/prismaClient";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IAuthenticateUserRepository } from "../../repositories/IAuthenticateUserRepository";

class AuthenticateUserRepository implements IAuthenticateUserRepository {
  async findUserByGoogleId(
    googleId: string
  ): Promise<(User & { infoUser: InfoUser | null }) | null> {
    const user = await prisma.user.findFirst({
      where: {
        googleId,
      },
      include: {
        infoUser: true,
      },
    });

    return user;
  }
  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
  async updateUser(idUser: string, infoUserId: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: idUser,
      },
      data: {
        infoUserId,
      },
    });
  }

  async createUser({
    avatar_url,
    email,
    googleId,
    name,
  }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        googleId,
        email,
        name,
        avatar_url,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        infoUser: true,
      },
    });

    return existUser;
  }
}

export { AuthenticateUserRepository };
