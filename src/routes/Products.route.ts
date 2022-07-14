import express from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductsHandler,
} from "../controller/Product.controller";
import { authUser } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { ProductSchema } from "../schema/Product.schema";

const router = express.Router();

router.get("/", authUser, getProductsHandler);

router.post(
  "/",
  [authUser, validateResource(ProductSchema)],
  createProductHandler
);

router.delete("/:id", authUser, deleteProductHandler);

export default router;
