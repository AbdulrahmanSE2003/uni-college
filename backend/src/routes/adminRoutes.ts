import express from "express";
import { protect } from "../controllers/authController";
import { createStudent } from "../controllers/adminController";

const adminRoutes = express.Router();

adminRoutes.use(protect);

adminRoutes.route("/student").post(createStudent);

export default adminRoutes;
