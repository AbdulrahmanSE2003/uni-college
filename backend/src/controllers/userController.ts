import Student from "../models/studentModel";
import Teacher from "../models/teacherModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { getOne } from "../utils/factory";
import resHandler from "../utils/resHandler";

export const changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, password, passwordConfirm } = req.body;

  if (!password || !passwordConfirm || !oldPassword)
    return next(
      new AppError("Invalid operation, please provide needed data", 400),
    );

  const user = await User.findById(req.user._id).select("+password");

  if (!user)
    return next(
      new AppError("Invalid operation, there is no such a user", 400),
    );

  if (!(await user.matchPassword(oldPassword)))
    return next(new AppError("Invalid operation, ensure data is correct", 400));

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordChangedAt = new Date(Date.now() - 1000);
  user.isFirstLogin = false;

  await user.save();
  resHandler(res, 200, "message", "Password changed successfully");
});

export const getMe = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  if (req.user.role === "student") {
    const student = await Student.findOne({ userId })
      .populate({
        path: "gradeId",
        select: "name academicYear",
      })
      .populate({
        path: "subjectIds",
        select: "title",
      });
    if (!student)
      return next(new AppError("Invalid operation, student not found.", 404));
    const userData = { ...req.user.toObject(), student };
    resHandler(res, 200, "user", userData);
  } else if (req.user.role === "teacher") {
    const teacher = await Teacher.findOne({ userId })
      .populate({
        path: "grades",
        select: "name",
      })
      .populate({
        path: "subjectIds",
        select: "title",
      });
    if (!teacher)
      return next(new AppError("Invalid operation, teacher not found.", 404));
    const userData = { ...req.user.toObject(), teacher };

    resHandler(res, 200, "user", userData);
  } else {
    resHandler(res, 200, "user", { ...req.user.toObject() });
  }
});
