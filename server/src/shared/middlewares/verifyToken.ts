import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

import jwt from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = jwt.verify(
      token,
      process.env.KEY_SECRET_JWT
    ) as IPayload;

    req.user = {
      id,
    };

    return next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
