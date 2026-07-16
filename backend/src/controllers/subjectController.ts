import Student from "../models/studentModel";
import Subject from "../models/subjectModel";
import Teacher from "../models/teacherModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { deleteOne, getAll, getOne, updateOne } from "../utils/factory";
import resHandler from "../utils/resHandler";

export const getAllSubjects = getAll(Subject, [
  {
    path: "gradeId",
    select: "name",
  },
  {
    path: "teacherId",
    select: "userId",
    populate: {
      path: "userId",
      select: "name",
    },
  },
]);

export const getSubject = getOne(Subject);

export const getMySubjects = catchAsync(async (req, res, next) => {
  const role = req.user.role;

  if (role === "student") {
    const studentProfile = await Student.findOne({ userId: req.user._id });
    if (!studentProfile)
      return next(new AppError("Invalid operation, no such a student.", 404));

    const subjects = await Subject.find({
      gradeId: studentProfile.gradeId,
    }).populate({
      path: "teacherId",
      select: "teacherId",
      populate: {
        path: "userId",
        select: "name",
      },
    });

    if (!subjects.length)
      return next(
        new AppError(
          "Invalid operation, no such a subjects for this grade.",
          404,
        ),
      );

    resHandler(res, 200, "subjects", subjects);
  } else if (role === "teacher") {
    const teacherProfile = await Teacher.findOne({
      userId: req.user._id,
    }).populate({
      path: "subjectIds",
      populate: {
        path: "gradeId",
        select: "name",
      },
    });
    if (!teacherProfile)
      return next(new AppError("Invalid operation, no such a teacher.", 404));

    resHandler(res, 200, "subjects", teacherProfile.subjectIds);
  } else {
    return next(
      new AppError("Invalid operation, not the right use admin routes", 400),
    );
  }
});

export const createSubject = catchAsync(async (req, res, next) => {
  const { title, teacherId, gradeId } = req.body;

  if (!title || !teacherId || !gradeId)
    return next(
      new AppError("Invalid operation, please provide needed fields.", 400),
    );

  const subject = await Subject.create({
    title,
    teacherId,
    gradeId,
  });

  resHandler(res, 201, "subject", subject);
});

export const updateSubject = updateOne(Subject);

export const deleteSubject = deleteOne(Subject);
