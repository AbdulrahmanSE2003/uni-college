import { Types } from "mongoose";
import Assignment from "../models/AssignmentModel";
import AssignmentSubmission from "../models/AssignmentSubmissionModel";
import Student from "../models/studentModel";
import Teacher from "../models/teacherModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { deleteOne, updateOne } from "../utils/factory";
import resHandler from "../utils/resHandler";

export const getMyAssignments = catchAsync(async (req, res, next) => {
  const role = req.user.role;

  if (role === "student") {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return next(new AppError("Student not found.", 404));
    const assignments = await Assignment.find({ gradeId: student.gradeId });
    return resHandler(res, 200, "assignments", assignments);
  }

  if (role === "teacher") {
    const teacher = await Teacher.findOne({ userId: req.user._id });
    if (!teacher) return next(new AppError("Teacher not found.", 404));
    const assignments = await Assignment.find({ teacherId: teacher._id });
    return resHandler(res, 200, "assignments", assignments);
  }
});
export const createAssignment = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const teacher = await Teacher.findOne({ userId });

  if (!teacher)
    return next(new AppError("Invalid operation, teacher not found.", 404));

  const { subjectId, gradeId, title, fileUrl, deadlineDate, totalMarks } =
    req.body;

  if (
    !subjectId ||
    !gradeId ||
    !title ||
    !fileUrl ||
    !deadlineDate ||
    !totalMarks
  )
    return next(
      new AppError("Invalid operation, please provide needed fields.", 400),
    );

  if (
    !teacher.grades.map((id) => id.toString()).includes(gradeId) ||
    !teacher.subjectIds.map((id) => id.toString()).includes(subjectId)
  )
    return next(new AppError("Invalid operation, not authorized action.", 400));

  const assignment = await Assignment.create({
    teacherId: teacher._id,
    subjectId,
    gradeId,
    title,
    fileUrl,
    deadlineDate,
    totalMarks,
  });

  resHandler(res, 201, "assignment", assignment);
});
export const submitAssignment = catchAsync(async (req, res, next) => {
  const assignmentId = req.params.id;
  if (!assignmentId)
    return next(
      new AppError("Invalid operation, please provide assignment id.", 400),
    );

  if (!(await Assignment.findOne({ _id: assignmentId })))
    return next(new AppError("Invalid operation, assignment not found.", 404));

  const userId = req.user._id;
  const student = await Student.findOne({ userId });
  if (!student)
    return next(new AppError("Invalid operation, student not found.", 404));

  if (
    await AssignmentSubmission.findOne({
      assignmentId,
      studentId: student._id.toString(),
    })
  )
    return next(new AppError("Invalid operation, Already submitted", 400));

  const { fileUrl, gradeId } = req.body;

  if (!fileUrl || !gradeId)
    return next(
      new AppError("Invalid operation, please provide needed fields.", 400),
    );

  if (student.gradeId.toString() !== gradeId)
    return next(new AppError("Invalid operation, not authorized action.", 400));

  await AssignmentSubmission.create({
    studentId: student._id.toString(),
    assignmentId: assignmentId.toString(),
    gradeId,
    fileUrl,
  });
  console.log("here");

  res.status(200).json({
    status: true,
    message: "Assignment solution submitted successfully.",
  });
});

export const gradeAssignment = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findOne({ userId: req.user._id });
  if (!teacher) return next(new AppError("Teacher not found.", 404));

  const assignmentId = req.params.id;
  if (!assignmentId)
    return new AppError(
      "Invalid operation, please provide assignment id.",
      400,
    );
  const { feedback, score } = req.body;

  if (!score)
    return next(
      new AppError("Invalid operation, please provide assignment score.", 400),
    );

  const assignmentSubmission = await AssignmentSubmission.findOneAndUpdate(
    {
      assignmentId,
    },
    { feedback, score, status: "graded" },
    { returnDocument: "after" },
  );

  if (!assignmentSubmission)
    return next(
      new AppError("Invalid operation, assignment submission not found.", 400),
    );

  resHandler(res, 200, "assignment", assignmentSubmission);
});

export const updateAssignment = updateOne(Assignment);

export const deleteAssignment = deleteOne(Assignment);
