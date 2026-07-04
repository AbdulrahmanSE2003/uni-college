import mongoose, { Document, ObjectId, Schema } from "mongoose";
import Student from "./studentModel";
import Subject from "./subjectModel";

export interface IGrade extends Document {
  name: string;
  academicYear: string;
  createdBy: ObjectId;
}

const gradeSchema: Schema<IGrade> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    academicYear: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);
gradeSchema.index({ name: 1, academicYear: 1 }, { unique: true });

gradeSchema.pre("findOneAndDelete", async function () {
  const grade = await this.model.findOne(this.getFilter());

  // Block deletion if students still assigned to this grade
  const studentsInGrade = await Student.countDocuments({ gradeId: grade._id });
  if (studentsInGrade > 0) {
    throw new Error("Cannot delete grade with active students.");
  }

  // Also clean up subjects
  await Subject.deleteMany({ gradeId: grade._id });
});

const Grade = mongoose.model<IGrade>("Grade", gradeSchema);

export default Grade;
