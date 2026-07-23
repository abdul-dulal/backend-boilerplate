import { Request, Response } from "express";
import catchAsync from "../../share/catchAsync";
import sendResponse from "../../share/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const userController = {
  createUser,
};
