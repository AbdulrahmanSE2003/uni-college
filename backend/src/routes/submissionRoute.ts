import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  getMySubmissions,
  getOneSubmission,
  submitQuiz,
} from "../controllers/submissionController";

const submissionRoutes = express.Router();

submissionRoutes.use(protect);
submissionRoutes.use(restrictTo("student"));

submissionRoutes.get("/", getMySubmissions);
submissionRoutes.post("/:id/submit", submitQuiz);
submissionRoutes.get("/:id", getOneSubmission);

export default submissionRoutes;
