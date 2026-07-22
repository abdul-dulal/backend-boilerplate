export type IStudent = {
  name: string;
  email: string;
  age: number;
  studentId: number;
};

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type IStudentFilters = {
  searchTerm?: string;
};
