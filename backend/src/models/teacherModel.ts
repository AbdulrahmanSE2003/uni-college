import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITeacher extends Document {
  userId: Types.ObjectId;
  grades: Types.ObjectId[];
  subjectIds: Types.ObjectId[];
  qualification: string;
  joiningDate: Date;
}

const teacherSchema = new Schema<ITeacher>(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    grades: [{ type: mongoose.Schema.ObjectId, ref: "Grade", required: true }],
    subjectIds: [
      { type: mongoose.Schema.ObjectId, ref: "Subject", required: true },
    ],
    qualification: String,
    joiningDate: { type: Date, default: Date.now() },
  },
  { timestamps: true },
);

teacherSchema.index({ userId: 1 }, { unique: true });

const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);

export default Teacher;
