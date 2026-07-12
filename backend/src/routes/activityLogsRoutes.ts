import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { getAllLogs } from "../controllers/activityLogController";

const activityLogsRoutes = express.Router();

activityLogsRoutes.use(protect);
activityLogsRoutes.use(restrictTo("admin"));

activityLogsRoutes.route("/").get(getAllLogs);

export default activityLogsRoutes;
