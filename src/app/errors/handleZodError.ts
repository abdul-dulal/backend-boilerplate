import { ZodError, ZodIssue } from "zod";
import { IGenericMessage } from "../commonInterface/IGenericMessage";
import { IGenericErrorPresponse } from "../commonInterface/Common";

const handleZodError = (error: ZodError): IGenericErrorPresponse => {
  const errors: IGenericMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1]?.toString() || "",
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleZodError;
