import ScoreRecord from "../models/scoreRecordModel";
import Teacher from "../models/teacherModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const enterScore = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findOne({ userId: req.user._id });
  if (!teacher)
    return next(new AppError("Invalid operation, Teacher not found.", 404));

  const { studentId, subjectId } = req.params;
  const { type, score, totalMarks, academicYear } = req.body;

  if (!type || !score || !totalMarks || !academicYear)
    return next(
      new AppError(
        "Invalid operation, please provide type, score, totalMarks and academicYear.",
        400,
      ),
    );

  if (!["midterm", "final"].includes(type))
    return next(
      new AppError("Invalid operation, type must be midterm or final.", 400),
    );

  const percentage = Math.round((score / totalMarks) * 100);

  const scoreData = {
    score,
    totalMarks,
    percentage,
    enteredBy: teacher._id,
    enteredAt: new Date(),
  };

  // upsert — create if doesn't exist, update if it does
  const record = await ScoreRecord.findOneAndUpdate(
    { studentId, subjectId, academicYear },
    { [type === "midterm" ? "midTerm" : "final"]: scoreData },
    { new: true, upsert: true },
  );

  resHandler(res, 200, "scoreRecord", record);
});

export const getStudentScores = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const scores = await ScoreRecord.find({ studentId }).populate(
    "subjectId",
    "name",
  );

  resHandler(res, 200, "scores", scores);
});
