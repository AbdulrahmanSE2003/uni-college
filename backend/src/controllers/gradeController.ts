import Grade from "../models/gradeModel";
import Student from "../models/studentModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/factory";
import { logActivity } from "../utils/logActivity";
import resHandler from "../utils/resHandler";

export const getMyGrade = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (user.role !== "student")
    return next(new AppError("Invalid operation, students only.", 400));

  // Getting student profile
  const student = await Student.findOne({ userId: user._id });
  if (!student)
    return next(
      new AppError("Invalid operation, there is no such a student.", 400),
    );

  // Getting student grade
  const grade = await Grade.findById(student.gradeId);
  if (!grade) return next(new AppError("Grade not found.", 404));

  resHandler(res, 200, "grade", grade);
});

export const getAllGrades = getAll(Grade);

export const getGrade = getOne(Grade);

export const createGrade = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const { name, academicYear } = req.body;

  if (!name || !academicYear)
    return next(
      new AppError(
        "Invalid operation, please provide name, academicYear,",
        400,
      ),
    );

  const grade = await Grade.create({
    name,
    academicYear,
    createdBy: userId,
  });

  await logActivity({
    userId: req.user._id,
    action: "GRADE_CREATED  ",
    details: `Admin Modified grade: ${req.user.name}`,
    req,
  });

  resHandler(res, 201, "grade", grade);
});

export const updateGrade = updateOne(Grade, async (doc, req) => {
  await logActivity({
    userId: req.user._id,
    action: "GRADE_MODIFIED",
    details: `Admin Modified grade: ${doc.name}`,
    req,
  });
});

export const deleteGrade = deleteOne(Grade, async (doc, req) => {
  await logActivity({
    userId: req.user._id,
    action: "GRADE_DELETED",
    details: `Admin deleted grade: ${doc.name}`,
    req,
  });
});
