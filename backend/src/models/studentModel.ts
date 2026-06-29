import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IStudent extends Document {
  userId: ObjectId;
  studentId: string;
  gradeId: ObjectId;
  subjectIds: ObjectId[];
  gpa: number;
  behaviorNotes: string;
}

const studentSchema: Schema<IStudent> = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    studentId: { type: String, required: true, unique: true },
    gradeId: { type: mongoose.Schema.ObjectId, ref: "Grade", required: true },
    subjectIds: [
      { type: mongoose.Schema.ObjectId, ref: "Subject", required: true },
    ],
    gpa: { type: Number, default: 0 },
    behaviorNotes: String,
  },
  { timestamps: true },
);

studentSchema.index({ userId: 1 }, { unique: true });
studentSchema.index({ userId: 1, gradeId: 1 });
studentSchema.index({ gradeId: 1 });

const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
