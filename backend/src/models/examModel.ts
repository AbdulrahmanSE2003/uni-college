import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { Types } from "mongoose";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface IExam extends Document {
  teacherId: Types.ObjectId;
  subjectId: Types.ObjectId;
  gradeId: Types.ObjectId;
  questions: Question[];
  topic: string; // for AI
  difficulty: "easy" | "medium" | "hard"; // for AI
  status: "draft" | "published";
  duration: number; //In mins
  deadline: Date;
  totalMarks: number;
}

const examSchema = new Schema<IExam>(
  {
    teacherId: {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.ObjectId,
      ref: "Subject",
      required: true,
    },
    gradeId: { type: mongoose.Schema.ObjectId, ref: "Grade", required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: {
          type: [String],
          validate: {
            validator: (val: string[]) => val.length >= 2 && val.length <= 4,
            message: "Options must have between 2 and 4 choices",
          },
        },
        correctAnswer: { type: String, required: true },
      },
    ],
    topic: { type: String, required: true }, // for AI
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    }, // for AI
    status: {
      type: String,
      enum: ["draft", "published"],
      required: true,
      default: "draft",
    },
    duration: { type: Number, required: true }, //In mins
    deadline: { type: Date, required: true },
    totalMarks: Number,
  },
  { timestamps: true },
);

examSchema.index({ gradeId: 1, subjectId: 1 });
examSchema.index({ teacherId: 1, status: 1 });

const Exam = mongoose.model<IExam>("Exam", examSchema);

export default Exam;
