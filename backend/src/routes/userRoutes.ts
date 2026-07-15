import express from "express";
import {
  checkFirstLogin,
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
} from "../controllers/authController";
import { changePassword, getMe } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.patch("/reset-password/:resetToken", resetPassword);

userRoutes.use(protect);

userRoutes.route("/change-password").patch(changePassword);

userRoutes.use(checkFirstLogin); // ← blocks everything below if first login

// TODO here goes future routes
userRoutes.route("/me").get(getMe);

export default userRoutes;
