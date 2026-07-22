import mongoose from "mongoose";
import { IGenericErrorPresponse } from "../commonInterface/Common";
import { IGenericMessage } from "../commonInterface/IGenericMessage";

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorPresponse => {
  const errors: IGenericMessage[] = Object.values(err.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validation error",
    errorMessages: errors,
  };
};
