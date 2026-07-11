import Exam from "../models/examModel";
import Student from "../models/studentModel";
import Subject from "../models/subjectModel";
import { generateExamQuestions } from "../services/geminiService";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { deleteOne, getAll, updateOne } from "../utils/factory";
import resHandler from "../utils/resHandler";

export const getAllExams = getAll(Exam);

export const getAvailableExams = catchAsync(async (req, res, next) => {
  // Getting student grade
  const student = await Student.findOne({ userId: req.user._id });

  if (!student)
    return next(
      new AppError("Invalid operation, there is no such a student", 404),
    );

  const exams = await Exam.find({
    gradeId: student.gradeId,
    status: "published",
  });

  if (exams.length) resHandler(res, 200, "exams", exams);
  else
    res
      .status(200)
      .json({ status: true, message: "No available exams currently." });
});

export const publishExam = catchAsync(async (req, res, next) => {
  if (!req.params.id)
    return next(
      new AppError("Invalid operation, please provide exam ID.", 400),
    );

  const exam = await Exam.findByIdAndUpdate(
    { _id: req.params.id },
    { status: "published" },
  );
  resHandler(res, 200, "exam", exam);
});

export const createExamManually = catchAsync(async (req, res, next) => {
  const {
    subjectId,
    gradeId,
    questions,
    topic,
    difficulty,
    duration,
    deadline,
    totalMarks,
  } = req.body;

  if (
    !subjectId ||
    !gradeId ||
    !questions ||
    !topic ||
    !difficulty ||
    !duration ||
    !deadline ||
    !totalMarks
  )
    return next(
      new AppError("Invalid operation, please provide needed fields.", 400),
    );

  const exam = await Exam.create({
    teacherId: req.user._id,
    subjectId,
    gradeId,
    questions,
    topic,
    difficulty,
    duration,
    deadline,
    totalMarks,
  });

  resHandler(res, 201, "exam", exam);
});

export const generateExamByAI = catchAsync(async (req, res, next) => {
  const {
    subjectId,
    gradeId,
    topic,
    difficulty,
    numberOfQuestions,
    duration,
    deadline,
  } = req.body;

  if (
    !subjectId ||
    !gradeId ||
    !topic ||
    !difficulty ||
    !numberOfQuestions ||
    !deadline
  )
    return next(new AppError("Please provide all required fields.", 400));

  // 1. Get subject name for the AI prompt
  const subject = await Subject.findById(subjectId);
  if (!subject) return next(new AppError("Subject not found.", 404));

  // 2. Call Gemini
  const questions = await generateExamQuestions({
    subject: subject.title,
    topic,
    difficulty,
    numberOfQuestions,
  });

  // 3. Save exam as draft
  const exam = await Exam.create({
    teacherId: req.user._id,
    subjectId,
    gradeId,
    questions,
    topic,
    difficulty,
    duration,
    deadline,
    totalMarks: numberOfQuestions,
    status: "draft",
  });

  resHandler(res, 201, "exam", exam);
});
export const updateExam = updateOne(Exam);
export const deleteExam = deleteOne(Exam);
