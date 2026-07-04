import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createGrade,
  deleteGrade,
  getAllGrades,
  getGrade,
  getMyGrade,
  updateGrade,
} from "../controllers/gradeController";

const gradeRoutes = express.Router();

gradeRoutes.use(protect);
gradeRoutes.route("/my-grade").get(getMyGrade);

gradeRoutes.use(restrictTo("admin"));

gradeRoutes.route("/").get(getAllGrades).post(createGrade);

gradeRoutes.route("/:id").get(getGrade).patch(updateGrade).delete(deleteGrade);

export default gradeRoutes;
