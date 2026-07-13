import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { Types } from "mongoose";

interface Answer {
  questionId: Types.ObjectId;
  isCorrect: boolean;
  selectedAnswer: string;
}
interface Result {
  score: number;
  totalMarks: number;
  percentage: number;
  gradedAt: Date;
}

export interface ISubmission extends Document {
  examId: Types.ObjectId;
  studentId: Types.ObjectId;
  answers: Answer[];
  result: Result;
  status: "submitted" | "graded";
  submittedAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
  examId: { type: mongoose.Schema.ObjectId, ref: "Exam", required: true },
  studentId: { type: mongoose.Schema.ObjectId, ref: "Student", required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.ObjectId, required: true },
      selectedAnswer: { type: String, required: true },
      isCorrect: { type: Boolean },
    },
  ],
  result: {
    score: { type: Number },
    totalMarks: { type: Number },
    percentage: { type: Number },
    gradedAt: { type: Date, default: Date.now },
  },
  status: { type: String, enum: ["submitted", "graded"], default: "submitted" },
  submittedAt: { type: Date, default: Date.now },
});

submissionSchema.index({ examId: 1, studentId: 1 }, { unique: true });
submissionSchema.index({ examId: 1, status: 1 });

const Submission = mongoose.model<ISubmission>("Submission", submissionSchema);

export default Submission;
