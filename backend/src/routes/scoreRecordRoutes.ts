import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  enterScore,
  getStudentScores,
} from "../controllers/scoreRecordController";

const scoreRecordRoutes = express.Router();

scoreRecordRoutes.use(protect);
scoreRecordRoutes.route("/:studentId").get(getStudentScores);

scoreRecordRoutes.use(restrictTo("teacher", "admin"));

scoreRecordRoutes.route("/:studentId/:subjectId").patch(enterScore);

export default scoreRecordRoutes;
