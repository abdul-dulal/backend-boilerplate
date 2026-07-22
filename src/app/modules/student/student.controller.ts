import { RequestHandler } from "express";
import { studentService } from "./student.service";

const createStudent: RequestHandler = async (req, res) => {
  try {
    const result = await studentService.createStudent(req.body);
    res.json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const studentController = {
  createStudent,
};
