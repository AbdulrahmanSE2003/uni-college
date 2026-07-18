export interface Grade {
  _id: string;
  name: string;
  academicYear: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GradeResponse {
  status: boolean;
  results?: number;
  grades: Grade[];
}
