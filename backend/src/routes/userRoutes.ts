import express from "express";
import {
  checkFirstLogin,
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
} from "../controllers/authController";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.patch("/reset-password/:resetToken", resetPassword);

userRoutes.use(protect);

// TODO here will goes change password route

userRoutes.use(checkFirstLogin); // ← blocks everything below if first login

// TODO here goes future routes

export default userRoutes;
