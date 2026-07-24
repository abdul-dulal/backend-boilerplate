import ApiError from "../../errors/ApiError";
import { userModel } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../helper/jwtHelpers";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  //   if user matched
  const isUserExist = await userModel.findOne({ email });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  //   if password matched
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password,
  );

  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }
  const { email: userEmail, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { role, email: userEmail },
    process.env.JWT_SECRET as Secret,
    process.env.JWT_EXPIRES_IN as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { role, email: userEmail },
    process.env.JWT_REFRESH_SECRET as Secret,
    process.env.JWT_REFRESH_EXPIRES_IN as string,
  );

  return { accessToken, refreshToken };
};

export const AuthService = {
  loginUser,
};
