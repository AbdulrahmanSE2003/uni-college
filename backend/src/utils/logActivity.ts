import { Request } from "express";
import ActivitiesLogs from "../models/activitiesLogsModel";
import { ObjectId } from "mongoose";

interface LogActivityOptions {
  userId: ObjectId;
  action: string;
  details: string;
  req: Request;
}

export const logActivity = async ({
  userId,
  action,
  details,
  req,
}: LogActivityOptions): Promise<void> => {
  try {
    await ActivitiesLogs.create({
      userId,
      action,
      details,
      ipAddress: req.ip,
    });
  } catch (error) {
    // Never let logging break the main flow
    console.error("Failed to write activity log:", error);
  }
};
