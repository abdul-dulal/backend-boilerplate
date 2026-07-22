import { IGenericMessage } from "./IGenericMessage";
export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
export type IGenericErrorPresponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericMessage[];
};
