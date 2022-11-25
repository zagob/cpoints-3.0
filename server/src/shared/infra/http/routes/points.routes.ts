import { Router } from "express";
import { CreatePointsController } from "../../../../modules/points/useCases/createPoints/CreatePointsController";
import { DeletePointController } from "../../../../modules/points/useCases/deletePoint/DeletePointController";
import { GetAllPointsByUserIdController } from "../../../../modules/points/useCases/getAllPointsByUserId/GetAllPointsByUserIdController";
import { GetPointsByMonthController } from "../../../../modules/points/useCases/getPointsByMonth/GetPointsByMonthController";
import { UpdatePointController } from "../../../../modules/points/useCases/updatePoint/UpdatePointController";
import { verifyToken } from "../../../middlewares/verifyToken";

export const pointsRoutes = Router();

const createPointsController = new CreatePointsController();
const updatePointController = new UpdatePointController();
const deletePointController = new DeletePointController();
const getPointsByMonthController = new GetPointsByMonthController();
const getAllPointsByUserIdController = new GetAllPointsByUserIdController();

pointsRoutes.post(
  "/create/:userId",
  verifyToken,
  createPointsController.handle
);

pointsRoutes.put("/update/:pointId", verifyToken, updatePointController.handle);

pointsRoutes.delete(
  "/delete/:pointId",
  verifyToken,
  deletePointController.handle
);

pointsRoutes.get(
  "/getPointByMonth",
  verifyToken,
  getPointsByMonthController.handle
);

pointsRoutes.get(
  "/getAllPoint/:userId",
  verifyToken,
  getAllPointsByUserIdController.handle
);
