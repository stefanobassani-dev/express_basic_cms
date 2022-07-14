import express from "express";
import {
  createUserHandler,
  logoutHandler,
  protectedRoute,
  refreshToken,
  userLoginHandler,
} from "../controller/User.controller";
import { UserSchema } from "../schema/User.schema";
import validateResource from "../middleware/validateResource";
import { auth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", validateResource(UserSchema), createUserHandler);

router.post("/login", validateResource(UserSchema), userLoginHandler);

router.get("/refresh", refreshToken);

router.get("/logout", auth, logoutHandler);

router.get("/protected", auth, protectedRoute);

export default router;
