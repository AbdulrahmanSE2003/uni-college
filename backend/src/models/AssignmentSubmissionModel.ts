import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IAssignmentSubmission extends Document {
  studentId: ObjectId;
  assignmentId: ObjectId;
  gradeId: ObjectId;
  fileUrl: string;
  feedback: string;
  submittedAt: Date;
  score: number;
  status: "submitted" | "graded";
}

const assignmentSubmissionSchema = new Schema<IAssignmentSubmission>({
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
  score: { type: Number },
  status: { type: String, enum: ["submitted", "graded"], default: "submitted" },
});

assignmentSubmissionSchema.index(
  { assignmentId: 1, studentId: 1 },
  { unique: true },
);
assignmentSubmissionSchema.index({ deadlineDate: 1 });

const AssignmentSubmission = mongoose.model<IAssignmentSubmission>(
  "AssignmentSubmission",
  assignmentSubmissionSchema,
);

export default AssignmentSubmission;
