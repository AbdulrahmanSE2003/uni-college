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

export const createStudent = catchAsync(async (req, res, next) => {
  const { name, email, gradeId } = req.body;

  if (!name || !email || !gradeId)
    return next(
      new AppError("Invalid operation, please provide needed data", 400),
    );

  const tempPassword = "Uni@12345"; // Will be changed on first login

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [user] = await User.create(
      [
        {
          name,
          email,
          password: tempPassword,
          passwordConfirm: tempPassword,
          role: "student",
        },
      ],
      { session },
    );

    const academicId = generateStudentId();

    const subjects = await Subject.find({
      gradeId,
    });
    const subjectIds = subjects.map((s) => s._id);

    const [student] = await Student.create(
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

    await sendWelcomeEmail({ email, name, role: "student", tempPassword });

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
  const { name, email, grades, subjects } = req.body;

  if (!name || !email || !grades || subjects)
    return next(
      new AppError("Invalid operation, please provide needed data", 400),
    );

  const tempPassword = "Uni-teach@12345"; // Will be changed on first login

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [user] = await User.create(
      [
        {
          name,
          email,
          password: tempPassword,
          passwordConfirm: tempPassword,
          role: "teacher",
        },
      ],
      { session },
    );

    const [teacher] = await Teacher.create(
      [
        {
          userId: user._id,
          grades,
          subjectIds: subjects,
        },
      ],
      { session },
    );

    await sendWelcomeEmail({ name, email, role: "teacher", tempPassword });

    await session.commitTransaction();
    resHandler(res, 201, "teacher", { user, teacher });
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});
