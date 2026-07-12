import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createAssignment,
  deleteAssignment,
  gradeAssignment,
  submitAssignment,
  updateAssignment,
} from "../controllers/assignmentController";

const assignmentRoutes = express.Router();

assignmentRoutes.use(protect);

assignmentRoutes
  .route("/")
  .post(restrictTo("teacher", "admin"), createAssignment);

assignmentRoutes
  .route("/:id")
  .post(restrictTo("teacher", "admin"), gradeAssignment)
  .patch(restrictTo("teacher", "admin"), updateAssignment)
  .delete(restrictTo("teacher", "admin"), deleteAssignment);

assignmentRoutes
  .route("/submit/:id")
  .post(restrictTo("student"), submitAssignment);
export default assignmentRoutes;
