import { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/users/useCases/authenticateUser/authenticateUserController";

export const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

usersRoutes.post("/user", authenticateUserController.handle);
