import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IAssignment extends Document {
  studentId: ObjectId;
  assignmentId: ObjectId;
  gradeId: ObjectId;
  fileUrl: string;
  feedback: string;
  submittedAt: Date;
  score: number;
  status: "submitted" | "graded";
}

const assignmentSchema = new Schema<IAssignment>({
  studentId: { type: mongoose.Schema.ObjectId, ref: "Student", required: true },
  assignmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "Assignment",
    required: true,
  },
  gradeId: { type: mongoose.Schema.ObjectId, ref: "Grade", required: true },
  fileUrl: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  feedback: String,
  score: { type: Number, required: true },
  status: { type: String, enum: ["submitted", "graded"], default: "submitted" },
});

assignmentSchema.index({ subjectId: 1, gradeId: 1 });
assignmentSchema.index({ deadlineDate: 1 });

const Assignment = mongoose.model<IAssignment>("Assignment", assignmentSchema);

export default Assignment;
