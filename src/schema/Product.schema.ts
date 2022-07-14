import { number, object, string, TypeOf } from "zod";

export const ProductSchema = object({
  body: object({
    name: string(),
    description: string(),
    price: number(),
    quantity: number(),
  }),
});

export type ProductInput = TypeOf<typeof ProductSchema>["body"];

export const DeleteProductSchema = object({
  params: object({
    id: string(),
  }),
});

export type DeleteProductInput = TypeOf<typeof DeleteProductSchema>["params"];
