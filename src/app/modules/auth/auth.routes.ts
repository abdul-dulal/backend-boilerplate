import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
const router = express.Router();
router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema as any),
  AuthController.loginUser,
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema as any),
  AuthController.refreshToken,
);
export const AuthRoutes = router;
