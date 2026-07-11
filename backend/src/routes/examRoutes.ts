import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createExamManually,
  deleteExam,
  generateExamByAI,
  getAllExams,
  getAvailableExams,
  publishExam,
  updateExam,
} from "../controllers/examController";

const examRoutes = express.Router();

examRoutes.use(protect);

examRoutes
  .route("/")
  .get(restrictTo("admin"), getAllExams)
  .post(restrictTo("admin", "teacher"), createExamManually);

examRoutes.route("/generate").post(generateExamByAI);
examRoutes.route("/my-exams").get(getAvailableExams);

examRoutes
  .route("/:id/publish")
  .patch(restrictTo("admin", "teacher"), publishExam);
examRoutes.route("/:id").patch(updateExam).delete(deleteExam);

export default examRoutes;
