import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { Types } from "mongoose";

interface Results extends Document {
  score: number;
  totalMarks: number;
  percentage: number;
  enteredBy: Types.ObjectId;
  enteredAt: Date;
}

export interface IScoreRecord extends Document {
  studentId: Types.ObjectId;
  subjectId: Types.ObjectId;
  academicYear: string;
  midTerm: Results;
  final: Results;
}

const scoreRecordSchema = new Schema<IScoreRecord>({
  studentId: { type: mongoose.Schema.ObjectId, ref: "Student", required: true },
  subjectId: { type: mongoose.Schema.ObjectId, ref: "Subject", required: true },
  academicYear: { type: String, required: true },
  midTerm: {
    score: { type: Number },
    totalMarks: { type: Number },
    percentage: { type: Number },
    enteredBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
      required: true,
    },
    enteredAt: { type: Date },
  },
  final: {
    score: { type: Number },
    totalMarks: { type: Number },
    percentage: { type: Number },
    enteredBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
      required: true,
    },
    enteredAt: { type: Date, required: true },
  },
});

scoreRecordSchema.index(
  { studentId: 1, subjectId: 1, academicYear: 1 },
  { unique: true },
);

const ScoreRecord = mongoose.model<IScoreRecord>(
  "ScoreRecord",
  scoreRecordSchema,
);

export default ScoreRecord;
