import express from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(createUserZodSchema as any),
  userController.createUser,
);

export const userRoutes = router;
