import { Request, Response } from "express";
import { UserInput } from "../schema/User.schema";
import { checkUser, createUser } from "../service/User.service";
import { get, omit } from "lodash";
import { signJwt, verifyJwt } from "../utils/jwt";
import dotenv from "dotenv";
import { clearTokens, setCookie } from "../utils/cookie";

dotenv.config();

export async function createUserHandler(
  req: Request<{}, {}, UserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    return res.status(200).json({
      message: "User successfully created",
      user: omit(user.toObject(), "password"),
    });
  } catch (err: any) {
    if (err.code === 11000)
      return res.status(409).json({ message: "User already exists" });

    return res.status(500).json({ message: err.message });
  }
}

export async function userLoginHandler(
  req: Request<{}, {}, UserInput>,
  res: Response
) {
  const body = req.body;

  const user = await checkUser(body);

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = signJwt({ user }, "access", {
    expiresIn: "15s",
  });

  const refreshToken = signJwt({ user }, "refresh", {
    expiresIn: "1h",
  });

  setCookie(res, "accessToken", accessToken, "access");
  setCookie(res, "refreshToken", refreshToken, "refresh");

  return res.status(200).json({ message: "User succefully logged in" });
}

export async function refreshToken(req: Request, res: Response) {
  const refreshToken = get(req.cookies, "refreshToken", "");

  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  const { decoded, expired } = verifyJwt(refreshToken, "refresh");

  if (!decoded || expired)
    return res.status(401).json({ message: "Unauthorized" });

  const user = get(decoded, "user", "");

  const accessToken = signJwt({ user }, "access", {
    expiresIn: "15s",
  });

  setCookie(res, "accessToken", accessToken, "access");

  return res.sendStatus(200);
}

export function protectedRoute(req: Request, res: Response) {
  return res.json({ product: "1234" });
}

export function logoutHandler(req: Request, res: Response) {
  clearTokens(res);
  return res.sendStatus(200);
}
