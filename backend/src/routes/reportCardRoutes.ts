import express from "express";
import { protect } from "../controllers/authController";
import { getReportCard } from "../controllers/reportCardController";

const reportCardRoutes = express.Router();

reportCardRoutes.use(protect);
reportCardRoutes.route("/").get(getReportCard);

export default reportCardRoutes;
