import Student from "../models/studentModel";
import Teacher from "../models/teacherModel";
import User from "../models/userModel";
import APIFeatures from "../utils/apiFeatures";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { deleteOne, getAll, getOne, updateOne } from "../utils/factory";
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

export const getAllUsers = catchAsync(async (req, res, next) => {
  // Statistics
  const [stats] = await User.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },

        admins: {
          $sum: {
            $cond: [{ $eq: ["$role", "admin"] }, 1, 0],
          },
        },

        teachers: {
          $sum: {
            $cond: [{ $eq: ["$role", "teacher"] }, 1, 0],
          },
        },

        students: {
          $sum: {
            $cond: [{ $eq: ["$role", "student"] }, 1, 0],
          },
        },

        active: {
          $sum: {
            $cond: ["$isActive", 1, 0],
          },
        },

        inactive: {
          $sum: {
            $cond: ["$isActive", 0, 1],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  // Paginated users
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  res.status(200).json({
    status: true,
    results: users.length,
    total: stats.totalUsers,
    page,
    pages: Math.ceil(stats.totalUsers / limit),
    stats,
    users,
  });
});

export const updateUser = updateOne(User);

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true, runValidators: false },
  );

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  res.status(200).json({
    status: true,
    message: "User deactivated successfully.",
  });
});
