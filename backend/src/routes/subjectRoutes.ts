import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  getAllSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  getMySubjects,
} from "../controllers/subjectController";

const subjectRoutes = express.Router();

subjectRoutes.use(protect);

subjectRoutes.get("/my-subjects", getMySubjects);

subjectRoutes.use(restrictTo("admin"));
subjectRoutes.route("/").get(getAllSubjects).post(createSubject);
subjectRoutes
  .route("/:id")
  .get(getSubject)
  .patch(updateSubject)
  .delete(deleteSubject);

export default subjectRoutes;
