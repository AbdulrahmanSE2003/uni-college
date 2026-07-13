import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createTimetable,
  generateTimetableByAI,
  getGradeTimetable,
} from "../controllers/TimetableController";

const timetableRoutes = express.Router();

timetableRoutes.use(protect);
timetableRoutes.route("/:gradeId").get(getGradeTimetable);

timetableRoutes.route("/").post(restrictTo("admin"), createTimetable);
timetableRoutes
  .route("/generate")
  .post(restrictTo("admin"), generateTimetableByAI);

export default timetableRoutes;
