import { Request, Response } from "express";
import { studentService } from "./student.service";
import catchAsync from "../../share/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../share/sendResponse";
import { IStudent } from "./student.interface";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.createStudent(req.body);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

export const studentController = {
  createStudent,
};
