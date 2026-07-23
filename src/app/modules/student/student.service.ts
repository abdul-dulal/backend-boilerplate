import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../commonInterface/Common";
import { paginationHelpers } from "../../helper/paginationHelper";
import {
  IPaginationOptions,
  IStudent,
  IStudentFilters,
} from "./student.interface";
import { studentModel } from "./student.model";
import { studentSearchableFields } from "./constant";

const createStudent = async (payload: IStudent) => {
  const result = await studentModel.create(payload);
  return result;
};

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  // console.log({ searchTerm }, filtersData);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await studentModel
    .find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await studentModel.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
