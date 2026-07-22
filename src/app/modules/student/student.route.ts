import express from "express";
import { studentController } from "./student.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createStudentZodSchema } from "./student.validation";
const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentZodSchema as any),
  studentController.createStudent,
);
export const studentRoutes = router;
