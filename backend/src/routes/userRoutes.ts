import express from "express";
import {
  checkFirstLogin,
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  restrictTo,
} from "../controllers/authController";
import {
  changePassword,
  deleteUser,
  getAllUsers,
  getMe,
  updateUser,
} from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.patch("/reset-password/:resetToken", resetPassword);

userRoutes.use(protect);

userRoutes.route("/").get(restrictTo("admin"), getAllUsers);
userRoutes.route("/change-password").patch(changePassword);

userRoutes.use(checkFirstLogin); // ← blocks everything below if first login

userRoutes.route("/me").get(getMe);
userRoutes
  .route("/:id")
  .patch(restrictTo("admin"), updateUser)
  .delete(restrictTo("admin"), deleteUser);

export default userRoutes;
