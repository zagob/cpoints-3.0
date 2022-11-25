import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import cors from "cors";
import "../container";
import "express-async-errors";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log("Server online..."));
