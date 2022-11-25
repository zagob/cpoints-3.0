import { Router } from "express";
import { infoUsersRoutes } from "./infoUsers.routes";
import { pointsRoutes } from "./points.routes";
import { usersRoutes } from "./users.routes";

export const routes = Router();

routes.use("/auth", usersRoutes);
routes.use("/infoUsers", infoUsersRoutes);
routes.use("/points", pointsRoutes);
