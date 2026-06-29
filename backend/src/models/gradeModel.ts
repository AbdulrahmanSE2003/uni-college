import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IGrade extends Document {
  name: string;
  academicYear: string;
  createdBy: ObjectId;
}

const gradeSchema: Schema<IGrade> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    academicYear: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);
gradeSchema.index({ name: 1, academicYear: 1 }, { unique: true });

const Grade = mongoose.model<IGrade>("Grade", gradeSchema);

export default Grade;
