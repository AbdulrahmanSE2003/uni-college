import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface Material {
  title: string;
  url: string;
}

export interface ISubject extends Document {
  title: string;
  teacherId: ObjectId;
  gradeId: ObjectId;
  materials: Material[];
}

const subjectSchema: Schema<ISubject> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    teacherId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    gradeId: { type: mongoose.Schema.ObjectId, ref: "Grade", required: true },
    materials: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

subjectSchema.index({ title: 1, gradeId: 1 });
subjectSchema.index({ gradeId: 1 });

const Subject = mongoose.model<ISubject>("Subject", subjectSchema);

export default Subject;
