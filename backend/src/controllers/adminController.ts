import mongoose from "mongoose";
import Student from "../models/studentModel";
import Subject from "../models/subjectModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { generateStudentId } from "../utils/generateStudentId";
import resHandler from "../utils/resHandler";
import { sendWelcomeEmail } from "../utils/sendEmail";
import Teacher from "../models/teacherModel";
import { getAll } from "../utils/factory";

export const getAllTeachers = getAll(Teacher, [
  { path: "userId", select: "name" },
]);

export const createStudent = catchAsync(async (req, res, next) => {
  const { name, email, gradeId, phone, gender } = req.body;

  if (!name || !email || !gradeId)
    return next(
      new AppError(
        "Invalid operation, please provide name, email, gradeId.",
        400,
      ),
    );

  const tempPassword = "Uni@12345"; // Will be changed on first login

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const users = await User.create(
      [
        {
          name,
          email,
          password: tempPassword,
          passwordConfirm: tempPassword,
          role: "student",
          phone,
          gender,
        },
      ],
      { session },
    );
    const user = users[0];

    const academicId = generateStudentId();

    const subjects = await Subject.find({
      gradeId,
    });
    const subjectIds = subjects.map((s) => s._id);

    const students = await Student.create(
      [
        {
          userId: user._id,
          academicId,
          gradeId,
          subjectIds,
        },
      ],
      { session },
    );
    const student = students[0];

    // TODO
    // await sendWelcomeEmail({ email, name, role: "student", tempPassword });

    await session.commitTransaction();
    resHandler(res, 201, "student", { user, student });
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

export const createTeacher = catchAsync(async (req, res, next) => {
  const { name, email, grades, subjects, phone, gender } = req.body;

  if (!name || !email || !grades)
    return next(
      new AppError("Invalid operation, please provide needed data", 400),
    );

  const tempPassword = "Uni-teach@12345"; // Will be changed on first login

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const users = await User.create(
      [
        {
          name,
          email,
          password: tempPassword,
          passwordConfirm: tempPassword,
          role: "teacher",
          phone,
          gender,
        },
      ],
      { session },
    );
    const user = users[0];

    const teachers = await Teacher.create(
      [
        {
          userId: user._id,
          grades,
          subjectIds: subjects,
        },
      ],
      { session },
    );
    const teacher = teachers[0];

    // await sendWelcomeEmail({ name, email, role: "teacher", tempPassword });

    await session.commitTransaction();
    resHandler(res, 201, "teacher", { user, teacher });
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});
