import mongoose, { Document, ObjectId } from "mongoose";
import { Schema } from "mongoose";

export interface IActivitiesLog extends Document {
  userId: ObjectId;
  action: string;
  details: string;
  createdAt: Date;
  ipAddress: string;
}

const activitiesLogsSchema: Schema<IActivitiesLog> = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

    action: { type: String, required: true },

    details: { type: String, required: true },

    ipAddress: { type: String, required: true },
  },
  { timestamps: true },
);

const ActivitiesLogs = mongoose.model<IActivitiesLog>(
  "ActivitiesLogs",
  activitiesLogsSchema,
);

export default ActivitiesLogs;
