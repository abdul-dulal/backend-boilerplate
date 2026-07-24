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

const refreshToken = async (token: string): Promise<string> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      process.env.JWT_REFRESH_SECRET as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { email } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  //   if user matched
  const isUserExist = await userModel.findOne({ email });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    process.env.JWT_SECRET as Secret,
    process.env.JWT_EXPIRES_IN as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
