import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { Types } from "mongoose";

interface TimeSlot {
  teacherId: Types.ObjectId;
  subjectId: Types.ObjectId;
  day: "SAT" | "SUN" | "MON" | "TUE" | "WED" | "THU";
  startTime: string;
  endTime: string;
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
      },
      subjectId: {
        type: mongoose.Schema.ObjectId,
        ref: "Subject",
      },
      location: { type: String, default: "TBD" },
      day: {
        type: String,
        enum: ["SAT", "SUN", "MON", "TUE", "WED", "THU"],
        required: true,
      },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  generatedBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

timetableSchema.index({ gradeId: 1 }, { unique: true });

const Timetable = mongoose.model<ITimetable>("Timetable", timetableSchema);

export default Timetable;
