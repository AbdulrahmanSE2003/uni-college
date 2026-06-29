import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ISubject extends Document {
  title: string;
  teacherId: ObjectId;
  gradeId: ObjectId;
}

const subjectSchema: Schema<ISubject> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    teacherId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    gradeId: { type: mongoose.Schema.ObjectId, ref: "Grade", required: true },
  },
  { timestamps: true },
);

subjectSchema.index({ title: 1, gradeId: 1 });
subjectSchema.index({ gradeId: 1 });

const Subject = mongoose.model<ISubject>("Subject", subjectSchema);

export default Subject;
