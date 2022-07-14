import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";

export function auth(req: Request, res: Response, next: NextFunction) {
  const accessToken = get(req.cookies, "accessToken", "");

  if (!accessToken) return res.status(401).json({ message: "Unauthorized" });

  const { decoded, expired } = verifyJwt(accessToken, "access");

  if (!decoded || expired)
    return res.status(401).json({ message: "Unauthorized" });

  return next();
}

export function authUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = get(req.cookies, "accessToken", "");

  if (!accessToken) return res.status(401).json({ message: "Unauthorized" });

  const { decoded, expired } = verifyJwt(accessToken, "access");

  if (!decoded || expired)
    return res.status(401).json({ message: "Unauthorized" });

  const user = get(decoded, "user", "");

  res.locals.user = user;

  return next();
}
