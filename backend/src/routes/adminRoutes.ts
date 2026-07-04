import express from "express";
import { protect } from "../controllers/authController";
import { createStudent, createTeacher } from "../controllers/adminController";

const adminRoutes = express.Router();

adminRoutes.use(protect);

adminRoutes.route("/student").post(createStudent);
adminRoutes.route("/teacher").post(createTeacher);

export default adminRoutes;
