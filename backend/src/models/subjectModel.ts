import mongoose, { Document, ObjectId, Schema } from "mongoose";
import Teacher from "./teacherModel";
import Student from "./studentModel";
import { Types } from "mongoose";

interface Material {
  title: string;
  url: string;
}

export interface ISubject extends Document {
  name: string;
  teacherId: Types.ObjectId;
  gradeId: Types.ObjectId;
  materials: Material[];
}

const subjectSchema: Schema<ISubject> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    teacherId: {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
      required: true,
    },
    gradeId: { type: mongoose.Schema.ObjectId, ref: "Grade", required: true },
    materials: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

subjectSchema.index({ name: 1, gradeId: 1 });
subjectSchema.index({ gradeId: 1 });

subjectSchema.post("save", async function () {
  console.log("POST SAVE HOOK");
  console.log(this.teacherId);
  // Add to all students in this grade
  await Student.updateMany(
    { gradeId: this.gradeId },
    { $addToSet: { subjectIds: this._id } },
  );
  console.log(this._id);

  const teacher = await Teacher.findByIdAndUpdate(
    this.teacherId,
    { $addToSet: { subjectIds: this._id } },
    { new: true },
  );

  console.log(teacher?.subjectIds);
});

subjectSchema.pre("findOneAndDelete", async function () {
  const subject = await this.model.findOne(this.getFilter());
  if (!subject) return;

  // Remove from all students
  await Teacher.findOneAndUpdate(
    { _id: subject.teacherId },
    { $pull: { subjectIds: subject._id } },
  );

  // Remove from teacher
  await Teacher.findOneAndUpdate(
    { userId: subject.teacherId },
    { $pull: { subjectIds: subject._id } },
    { returnDocument: "after" },
  );
});

const Subject = mongoose.model<ISubject>("Subject", subjectSchema);

export default Subject;
