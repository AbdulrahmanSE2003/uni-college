import Grade from "../models/gradeModel";
import Subject from "../models/subjectModel";
import Timetable from "../models/timetableModel";
import { generateTimetable } from "../services/geminiService";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const createTimetable = catchAsync(async (req, res, next) => {
  const { gradeId, timeSlots } = req.body;
  if (!gradeId || !timeSlots.length)
    return next(
      new AppError("Invalid operation, please provide gradeId, timeSlots", 400),
    );

  const existing = await Timetable.findOne({ gradeId });
  if (existing)
    return next(
      new AppError(
        "Timetable already exists for this grade. Update it instead.",
        400,
      ),
    );

  const timetable = await Timetable.create({
    gradeId,
    timeSlots,
    generatedBy: req.user._id,
  });

  resHandler(res, 201, "timetable", timetable);
});

export const generateTimetableByAI = catchAsync(async (req, res, next) => {
  const { gradeId, startTime, endTime, periodsPerDay, days } = req.body;

  if (!gradeId || !startTime || !endTime || !periodsPerDay || !days)
    return next(
      new AppError(
        "Invalid operation. please provide all required fields.",
        400,
      ),
    );

  // Check if timetable already exists
  const existing = await Timetable.findOne({ gradeId });
  if (existing)
    return next(
      new AppError(
        "Invalid operation. timetable already exists for this grade. Update it instead.",
        400,
      ),
    );

  // Get grade info
  const grade = await Grade.findById(gradeId);
  if (!grade)
    return next(new AppError("Invalid operation. grade not found.", 404));

  // Get all subjects with their teachers for this grade
  const subjects = await Subject.find({ gradeId }).populate({
    path: "teacherId",
    populate: {
      path: "userId",
      select: "name",
    },
  });
  if (!subjects.length)
    return next(
      new AppError("Invalid operation. no subjects found for this grade.", 404),
    );

  const subjectsData = subjects.map((s) => ({
    name: s.title,
    teacherName: (s.teacherId as any).userId?.name || "TBD",
  }));

  // Call Gemini
  const slots = await generateTimetable({
    gradeName: grade.name,
    subjects: subjectsData,
    startTime,
    endTime,
    periodsPerDay,
    days,
  });

  // Map AI response back to our schema with real IDs
  const timeSlots = slots.map((slot) => {
    const subject = subjects.find((s) => s.title === slot.subjectName);

    // Handle free slots - use undefined instead of null
    if (slot.subjectName === "Free Slot" || !subject) {
      return {
        day: slot.day as "SAT" | "SUN" | "MON" | "TUE" | "WED" | "THU",
        subjectId: undefined, // Changed from null to undefined
        teacherId: undefined, // Changed from null to undefined
        startTime: slot.startTime,
        endTime: slot.endTime,
        location: "Free",
      };
    }

    return {
      day: slot.day as "SAT" | "SUN" | "MON" | "TUE" | "WED" | "THU",
      subjectId: subject._id,
      teacherId: subject.teacherId,
      startTime: slot.startTime,
      endTime: slot.endTime,
      location: "TBD",
    };
  });

  const timetable = await Timetable.create({
    gradeId,
    timeSlots,
    generatedBy: req.user._id,
  });

  resHandler(res, 201, "timetable", timetable);
});

export const getGradeTimetable = catchAsync(async (req, res, next) => {
  const { gradeId } = req.params;
  if (!gradeId)
    return next(
      new AppError("Invalid operation, please provide gradeId.", 400),
    );
  const timetable = await Timetable.findOne({ gradeId })
    .populate({
      path: "timeSlots.subjectId",
      select: "title",
    })
    .populate({
      path: "timeSlots.teacherId",
      populate: { path: "userId", select: "name email" },
    });

  if (!timetable)
    return next(
      new AppError("There is not timetable for this grade yet.", 404),
    );
  else resHandler(res, 200, "timetable", timetable);
});
