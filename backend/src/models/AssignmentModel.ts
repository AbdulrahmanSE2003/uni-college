import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IAssignment extends Document {
  teacherId: ObjectId;
  subjectId: ObjectId;
  gradeId: ObjectId;
  title: string;
  fileUrl: string;
  publishedAt: Date;
  deadlineDate: Date;
  totalMarks: number;
}

const assignmentSchema = new Schema<IAssignment>({
  teacherId: { type: mongoose.Schema.ObjectId, ref: "Teacher", required: true },
  subjectId: { type: mongoose.Schema.ObjectId, ref: "Subject", required: true },
  gradeId: { type: mongoose.Schema.ObjectId, ref: "Grade", required: true },
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  deadlineDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true },
});

assignmentSchema.index({ subjectId: 1, gradeId: 1 });
assignmentSchema.index({ deadlineDate: 1 });

const Assignment = mongoose.model<IAssignment>("Assignment", assignmentSchema);

export default Assignment;
