import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { createStudent, createTeacher } from "../controllers/adminController";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(restrictTo("admin"));

adminRoutes.route("/student").post(createStudent);
adminRoutes.route("/teacher").post(createTeacher);

export default adminRoutes;
