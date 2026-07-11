import { Types } from "mongoose";
import Submission from "../models/submissionModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import Student from "../models/studentModel";
import { inngest } from "../config/inngest";
import resHandler from "../utils/resHandler";

export const submitQuiz = catchAsync(async (req, res, next) => {
  const examId = req.params.id;
  const student = await Student.findOne({ userId: req.user._id });
  if (!student)
    return next(
      new AppError("Invalid operation, student profile not found.", 404),
    );

  const { answers } = req.body;
  if (!answers)
    return next(
      new AppError("Invalid operation, please provide needed fields.", 400),
    );

  const submission = await Submission.create({
    examId: examId as unknown as Types.ObjectId,

    studentId: student._id,
    answers,
  });

  await inngest.send({
    name: "exam/submitted",
    data: { submissionId: submission._id.toString() },
  });

  res
    .status(201)
    .json({ status: true, message: "Submission created successfully." });
});

export const getMySubmissions = catchAsync(async (req, res, next) => {
  const student = await Student.findOne({ userId: req.user._id });
  if (!student)
    return next(
      new AppError("Invalid operation, student profile not found.", 404),
    );

  const submissions = await Submission.find({
    studentId: student._id,
  }).populate("examId", "topic difficulty duration");

  if (!submissions.length)
    res.status(200).json({
      status: true,
      message: "There is no submission for this student.",
    });
  else resHandler(res, 200, "submissions", submissions);
});

export const getOneSubmission = catchAsync(async (req, res, next) => {
  const submissionId = req.params.id;
  if (!submissionId)
    return next(
      new AppError("Invalid operation, please provide submission id.", 400),
    );
  const student = await Student.findOne({ userId: req.user._id });
  if (!student)
    return next(
      new AppError("Invalid operation, student profile not found.", 404),
    );

  const submission = await Submission.findOne({
    _id: submissionId,
    studentId: student._id,
  }).populate("examId");

  if (!submission)
    return next(new AppError("Invalid operation, submission not found.", 404));

  resHandler(res, 200, "submission", submission);
});
