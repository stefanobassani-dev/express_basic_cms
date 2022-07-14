import { Response } from "express";

const defaultCookieOptions = {
  httpOnly: true,
  secure: false,
  // sameSite: "none",
  // domain: "http://localhost:3000",
  // path: "/",
};

const accessTokenOptions = {
  ...defaultCookieOptions,
  maxAge: 1000 * 15,
};

const refreshTokenOptions = {
  ...defaultCookieOptions,
  maxAge: 1000 * 60 * 60,
};

export function setCookie(
  res: Response,
  key: string,
  value: string,
  type: "access" | "refresh"
) {
  const options = type === "access" ? accessTokenOptions : refreshTokenOptions;

  res.cookie(key, value, options);
}

export function clearTokens(res: Response) {
  res.cookie("accessToken", "", { ...defaultCookieOptions, maxAge: 0 });
  res.cookie("refreshToken", "", { ...defaultCookieOptions, maxAge: 0 });
}
