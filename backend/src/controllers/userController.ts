import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
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
