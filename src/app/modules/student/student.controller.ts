import { Request, Response } from "express";
import { studentService } from "./student.service";
import catchAsync from "../../share/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../share/sendResponse";
import { IStudent } from "./student.interface";
import pick from "../../share/pick";
import { paginationFields, studentFilterableFields } from "./constant";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.createStudent(req.body);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await studentService.getAllStudents(
    paginationOptions,
    filters,
  );
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.getSingleStudent(req.params.id as string);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrive successfully",
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.deleteStudent(req.params.id as string);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student delete successfully",
    data: result,
  });
});
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await studentService.updateStudent(id as string, payload);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student delete successfully",
    data: result,
  });
});

export const studentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
