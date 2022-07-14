import { object, string, TypeOf } from "zod";

export const UserSchema = object({
  body: object({
    email: string().email(),
    password: string().min(8),
  }),
});

export type UserInput = TypeOf<typeof UserSchema>["body"];
