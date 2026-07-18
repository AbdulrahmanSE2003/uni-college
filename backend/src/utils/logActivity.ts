import { Request } from "express";
import ActivitiesLogs from "../models/activitiesLogsModel";
import {
  ObjectId,
  TypeExpressionOperatorReturningObjectId,
  Types,
} from "mongoose";

interface LogActivityOptions {
  userId: Types.ObjectId;
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
      userId: userId.toString(),
      action,
      details,
      ipAddress: req.ip,
    });
  } catch (error) {
    // Never let logging break the main flow
    console.error("Failed to write activity log:", error);
  }
};
