import express from "express";
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  signUp,
} from "../controllers/authController";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/signup", signUp);
userRoutes.post("/logout", logout);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.patch("/reset-password/:resetToken", resetPassword);

userRoutes.use(protect);
// TODO here goes future routes

export default userRoutes;
