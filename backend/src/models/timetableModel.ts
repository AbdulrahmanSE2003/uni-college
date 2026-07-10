import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { Types } from "mongoose";

interface TimeSlot {
  teacherId: Types.ObjectId;
  subjectId: Types.ObjectId;
  day: "SAT" | "SUN" | "MON" | "TUE" | "WED" | "THU";
  startTime: Date;
  endTime: Date;
  location: string;
}

export interface ITimetable extends Document {
  gradeId: Types.ObjectId;
  timeSlots: TimeSlot[];
  generatedBy: Types.ObjectId;
}

const timetableSchema = new Schema<ITimetable>({
  gradeId: { type: mongoose.Schema.ObjectId, ref: "Grade", required: true },
  timeSlots: [
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
      location: { type: String, required: true },
      day: {
        type: String,
        enum: ["SAT", "SUN", "MON", "TUE", "WED", "THU"],
        required: true,
      },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
  generatedBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

timetableSchema.index({ gradeId: 1 }, { unique: true });

const Timetable = mongoose.model<ITimetable>("Timetable", timetableSchema);

export default Timetable;
