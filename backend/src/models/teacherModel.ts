import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ITeacher extends Document {
  userId: ObjectId;
  grades: ObjectId[];
  subjectIds: ObjectId[];
  qualification: string;
  joiningDate: Date;
}

const teacherSchema = new Schema<ITeacher>(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    grades: [{ type: mongoose.Schema.ObjectId, ref: "Grade", required: true }],
    subjectIds: [
      { type: mongoose.Schema.ObjectId, ref: "Subject", required: true },
    ],
    qualification: String,
    joiningDate: Date,
  },
  { timestamps: true },
);

teacherSchema.index({ userId: 1 }, { unique: true });

const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);

export default Teacher;
