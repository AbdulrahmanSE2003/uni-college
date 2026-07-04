import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface Results extends Document {
  score: number;
  totalMarks: number;
  percentage: number;
  enteredBy: ObjectId;
  enteredAt: Date;
}

export interface ISCoreRecord extends Document {
  studentId: ObjectId;
  subjectId: ObjectId;
  academicYear: string;
  midTerm: Results;
  final: Results;
}

const ScoreRecordSchema = new Schema<ISCoreRecord>({
  studentId: { type: mongoose.Schema.ObjectId, ref: "Student", required: true },
  subjectId: { type: mongoose.Schema.ObjectId, ref: "Subject", required: true },
  academicYear: { type: String, required: true },
  midTerm: {
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    enteredBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
      required: true,
    },
    enteredAt: { type: Date, required: true },
  },
  final: {
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    enteredBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
      required: true,
    },
    enteredAt: { type: Date, required: true },
  },
});

const SCoreREcord = mongoose.model<ISCoreRecord>(
  "SCoreREcord",
  ScoreRecordSchema,
);

export default SCoreREcord;
