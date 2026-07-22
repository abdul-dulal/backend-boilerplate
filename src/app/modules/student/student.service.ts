import { IStudent } from "./student.interface";
import { studentModel } from "./student.model";

const createStudent = async (payload: IStudent) => {
  const result = await studentModel.create(payload);
  return result;
};

export const studentService = {
  createStudent,
};
