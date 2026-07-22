import { IStudent } from "./student.interface";
import { studentModel } from "./student.model";

const createStudent = async (payload: IStudent) => {
  const result = await studentModel.create(payload);
  return result;
};

const getAllStudents = async () => {
  const result = await studentModel.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await studentModel.findById(id);
  return result;
};

const deleteStudent = async (id: string) => {
  const result = await studentModel.findByIdAndDelete(id);
  return result;
};

const updateStudent = async (id: string, payload: IStudent) => {
  const result = await studentModel.findByIdAndUpdate(id, payload);
  return result;
};

export const studentService = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
