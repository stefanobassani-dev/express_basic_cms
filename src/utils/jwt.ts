import jwt, { JwtPayload } from "jsonwebtoken";

export function signJwt(
  payload: object | JwtPayload,
  type: "access" | "refresh",
  options: jwt.SignOptions
) {
  let key: string | undefined;

  type === "access"
    ? (key = process.env.ACCESS_PRIVATE_KEY)
    : (key = process.env.REFRESH_PRIVATE_KEY);

  if (key === undefined) throw new Error("Key not valid");

  return jwt.sign(payload, key, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string, type: "access" | "refresh") {
  let key: string | undefined;

  type === "access"
    ? (key = process.env.ACCESS_PUBLIC_KEY)
    : (key = process.env.REFRESH_PUBLIC_KEY);

  if (key === undefined) throw new Error("Key not valid");

  try {
    const decoded = jwt.verify(token, key);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    console.log({ err });

    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
