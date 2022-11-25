import { Router } from "express";
import { CreateInfoUserController } from "../../../../modules/users/useCases/createInfoUser/CreateInfoUserController";
import { UpdateInfoUserController } from "../../../../modules/users/useCases/updateInfoUser/UpdateInfoUserController";
import { verifyToken } from "../../../middlewares/verifyToken";

export const infoUsersRoutes = Router();

const updateInfoUserController = new UpdateInfoUserController();
const createInfoUserController = new CreateInfoUserController();

infoUsersRoutes.put(
  "/update/:id",
  verifyToken,
  updateInfoUserController.handle
);
infoUsersRoutes.post(
  "/create/:idUser",
  verifyToken,
  createInfoUserController.handle
);
