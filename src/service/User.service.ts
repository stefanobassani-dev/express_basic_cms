import argon2 from "argon2";
import { omit } from "lodash";
import { User, UserModel } from "../model/User.model";

export async function createUser(input: User) {
  return await UserModel.create(input);
}

export async function checkUser(input: User) {
  const user = await UserModel.findOne({ email: input.email });

  if (!user) return null;

  const isValid = await argon2.verify(user.password, input.password);

  return isValid ? omit(user.toObject(), "password") : null;
}

export async function getUserByEmail(email: string) {
  return await UserModel.findOne({ email });
}
