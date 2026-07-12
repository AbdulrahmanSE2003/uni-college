import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createAssignment,
  deleteAssignment,
  getMyAssignments,
  gradeAssignment,
  submitAssignment,
  updateAssignment,
} from "../controllers/assignmentController";

const assignmentRoutes = express.Router();

assignmentRoutes.use(protect);

assignmentRoutes
  .route("/")
  .get(restrictTo("student", "teacher"), getMyAssignments)
  .post(restrictTo("teacher", "admin"), createAssignment);

assignmentRoutes
  .route("/submit/:id")
  .post(restrictTo("student"), submitAssignment);

assignmentRoutes
  .route("/:id")
  .patch(restrictTo("teacher", "admin"), updateAssignment)
  .delete(restrictTo("teacher", "admin"), deleteAssignment);

assignmentRoutes
  .route("/:id/grade")
  .patch(restrictTo("teacher", "admin"), gradeAssignment);

export default assignmentRoutes;
