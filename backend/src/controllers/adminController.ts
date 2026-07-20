import mongoose from "mongoose";
import Student from "../models/studentModel";
import Subject from "../models/subjectModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { generateStudentId } from "../utils/generateStudentId";
import resHandler from "../utils/resHandler";
import { sendWelcomeEmail } from "../utils/sendEmail";
import Teacher from "../models/teacherModel";
import { getAll } from "../utils/factory";

export const getAllTeachers = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const [stats] = await Teacher.aggregate([
    {
      $group: {
        _id: null,
        totalTeachers: { $sum: 1 },
        totalQualifications: { $addToSet: "$qualification" },
        totalSubjects: { $sum: { $size: "$subjectIds" } },
        totalGrades: { $sum: { $size: "$grades" } },
      },
    },
    {
      $project: {
        _id: 0,
        totalTeachers: 1,
        totalSubjects: 1,
        totalGrades: 1,
        totalQualifications: { $size: "$totalQualifications" },
      },
    },
  ]);

  const total = await Teacher.countDocuments();
  const teacher = await Teacher.findOne({
    _id: "6a5cf2c19b5ac554b8b164ca",
  });
  console.log(teacher?.subjectIds);

  const teacher2 = await Teacher.findOne({
    _id: "6a5cf2c19b5ac554b8b164ca",
  }).populate("subjectIds");
  console.log(teacher2?.subjectIds);

  const teachers = await Teacher.find()
    .populate({
      path: "userId",
      select: "name",
    })
    .populate("grades", "name")
    .populate("subjectIds", "name");

  resHandler(res, 200, "teachers", {
    page,
    results: teachers.length,
    total,
    totalPages: Math.ceil(total / limit),
    teachers: teachers,
    stats: stats ?? {
      totalTeachers: 0,
      totalSubjects: 0,
      totalGrades: 0,
      totalQualifications: 0,
    },
  });
});

export const createStudent = catchAsync(async (req, res, next) => {
  const { name, email, gradeId, phone, gender } = req.body;

  if (!name || !email || !gradeId)
    return next(
      new AppError(
        "Invalid operation, please provide name, email, gradeId.",
        400,
      ),
    );

  const tempPassword = "Uni@12345"; // Will be changed on first login

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const users = await User.create(
      [
        {
          name,
          email,
          password: tempPassword,
          passwordConfirm: tempPassword,
          role: "student",
          phone,
          gender,
        },
      ],
      { session },
    );
    const user = users[0];

    const academicId = generateStudentId();

    const subjects = await Subject.find({
      gradeId,
    });
    const subjectIds = subjects.map((s) => s._id);

    const students = await Student.create(
      [
        {
          userId: user._id,
          academicId,
          gradeId,
          subjectIds,
        },
      ],
      { session },
    );
    const student = students[0];

    // TODO
    // await sendWelcomeEmail({ email, name, role: "student", tempPassword });

    await session.commitTransaction();
    resHandler(res, 201, "student", { user, student });
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

export const createTeacher = catchAsync(async (req, res, next) => {
  const { name, email, grades, subjects, phone, gender } = req.body;

  if (!name || !email || !grades)
    return next(
      new AppError("Invalid operation, please provide needed data", 400),
    );

  const tempPassword = "Uni-teach@12345"; // Will be changed on first login

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const users = await User.create(
      [
        {
          name,
          email,
          password: tempPassword,
          passwordConfirm: tempPassword,
          role: "teacher",
          phone,
          gender,
        },
      ],
      { session },
    );
    const user = users[0];

    const teachers = await Teacher.create(
      [
        {
          userId: user._id,
          grades,
          subjectIds: subjects,
        },
      ],
      { session },
    );
    const teacher = teachers[0];

    // await sendWelcomeEmail({ name, email, role: "teacher", tempPassword });

    await session.commitTransaction();
    resHandler(res, 201, "teacher", { user, teacher });
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});
