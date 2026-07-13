import AssignmentSubmission from "../models/AssignmentSubmissionModel";
import ScoreRecord from "../models/scoreRecordModel";
import Student from "../models/studentModel";
import Submission from "../models/submissionModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const getReportCard = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const student = await Student.findOne({ userId })
    .populate({ path: "userId", select: "name email" })
    .populate({ path: "gradeId", select: "name academicYear" })
    .select("-subjectIds");

  if (!student)
    return next(new AppError("Invalid operation, student not found.", 404));
  const studentId = student._id;

  // Get quizzes results
  const examsResults = await Submission.find({
    studentId,
    status: "graded",
  })
    .populate({
      path: "examId",
      populate: {
        path: "subjectId",
        select: "title",
      },
    })
    .select("-answers -questions -deadline -duration");

  // Get student results
  const results = await ScoreRecord.find({ studentId }).populate({
    path: "subjectId",
    select: "title",
  });

  // Get student assignments Submission
  const assignmentsSubmissions = await AssignmentSubmission.find({
    studentId,
  })
    .select("assignmentId score")
    .populate({
      path: "assignmentId",
      select: "title",
      populate: {
        path: "subjectId",
        select: "title",
      },
    });
  const subjectGrades = results.map((record) => {
    const subject = record.subjectId as any;

    // Get quiz average for this subject
    const subjectQuizzes = examsResults.filter(
      (s) =>
        (s.examId as any)?.subjectId?._id?.toString() ===
        subject._id.toString(),
    );
    const quizAvg = subjectQuizzes.length
      ? subjectQuizzes.reduce(
          (sum, s) => sum + (s.result?.percentage || 0),
          0,
        ) / subjectQuizzes.length
      : 0;

    // Get assignment average for this subject
    const subjectAssignments = assignmentsSubmissions.filter(
      (a) =>
        (a.assignmentId as any)?.subjectId?._id?.toString() ===
        subject._id.toString(),
    );
    const assignAvg = subjectAssignments.length
      ? subjectAssignments.reduce(
          (sum, a) =>
            sum + ((a.score / (a as any).assignmentId?.totalMarks) * 100 || 0),
          0,
        ) / subjectAssignments.length
      : 0;

    const midterm = record.midTerm?.percentage || 0;
    const final = record.final?.percentage || 0;

    const finalGrade =
      quizAvg * 0.2 + assignAvg * 0.1 + midterm * 0.3 + final * 0.4;

    const getGPALetter = (score: number) => {
      if (score >= 90) return { letter: "A", points: 4.0 };
      if (score >= 80) return { letter: "B+", points: 3.5 };
      if (score >= 70) return { letter: "B", points: 3.0 };
      if (score >= 60) return { letter: "C+", points: 2.5 };
      if (score >= 50) return { letter: "C", points: 2.0 };
      return { letter: "F", points: 0.0 };
    };

    return {
      subject: subject.title,
      quizAvg: Math.round(quizAvg),
      assignmentAvg: Math.round(assignAvg),
      midterm,
      final,
      finalGrade: Math.round(finalGrade),
      ...getGPALetter(finalGrade),
    };
  });

  const cgpa = subjectGrades.length
    ? subjectGrades.reduce((sum, s) => sum + s.points, 0) / subjectGrades.length
    : 0;

  const finalData = {
    student: {
      name: (student.userId as any).name,
      academicId: student.academicId,
    },
    grade: {
      name: (student.gradeId as any).name,
      academicYear: (student.gradeId as any).academicYear,
    },
    subjects: subjectGrades,
    cgpa: Math.round(cgpa * 100) / 100,
    generatedAt: new Date(),
  };

  resHandler(res, 200, "ReportCard", finalData);
});
