import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createStudent,
  createTeacher,
  getAllTeachers,
} from "../controllers/adminController";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(restrictTo("admin"));

adminRoutes.route("/student").post(createStudent);
adminRoutes.route("/teacher").get(getAllTeachers).post(createTeacher);

export default adminRoutes;
