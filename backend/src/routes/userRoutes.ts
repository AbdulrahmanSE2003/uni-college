import express from "express";
import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  signUp,
} from "../controllers/authController";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/signup", signUp);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.patch("/reset-password", resetPassword);

userRoutes.use(protect);
// TODO here goes future routes

export default userRoutes;
