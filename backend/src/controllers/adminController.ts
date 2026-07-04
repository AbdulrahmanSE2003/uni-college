import mongoose from "mongoose";
import Student from "../models/studentModel";
import Subject from "../models/subjectModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { generateStudentId } from "../utils/generateStudentId";

export const createStudent = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new AppError(
        "Invalid operation, you are not authorized to perform this action",
        400,
      ),
    );

  const { name, email, gradeId } = req.body;

  if (!name || !email)
    return next(
      new AppError("Invalid operation, please provide needed data", 400),
    );

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.create({
      name,
      email,
      password: "11223344",
      passwordConfirm: "11223344",
      role: "student",
    });

    if (!user)
      return next(
        new AppError(
          "Invalid operation, error while creating user account",
          400,
        ),
      );

    const academicId = generateStudentId();

    const [subjects] = await Subject.find({
      gradeId,
    });

    if (!subjects)
      return next(
        new AppError("Invalid operation, error while assigning subjects", 400),
      );
    console.log(subjects);

    const studentAcc = await Student.create({
      userId: user._id,
      academicId,
      gradeId,
      // subjectId: subjects,
    });

    await session.commitTransaction();
  } catch (error) {
    throw error;
    session.abortTransaction();
  } finally {
    session.endSession();
  }

  res.status(200).json({ status: true });
});
