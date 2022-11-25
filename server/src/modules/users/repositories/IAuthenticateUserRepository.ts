import { InfoUser, User } from "@prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IAuthenticateUserRepository {
  createUser(data: ICreateUserDTO): Promise<User>;
  updateUser(idUser: string, infoUserId: string): Promise<void>;
  findUserByGoogleId(
    googleId: string
  ): Promise<(User & { infoUser: InfoUser | null }) | null>;
  findByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
}

export { IAuthenticateUserRepository };
