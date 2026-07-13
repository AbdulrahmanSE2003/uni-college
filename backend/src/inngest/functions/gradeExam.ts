import { inngest } from "../../config/inngest";
import Submission from "../../models/submissionModel";
import Student from "../../models/studentModel";
import { sendEmail } from "../../utils/sendEmail";

export const gradeExamFunction = inngest.createFunction(
  { id: "grade-exam" },
  { event: "exam/submitted" },
  async ({ event, step }: { event: any; step: any }) => {
    const { submissionId } = event.data;

    // Step 1 — Grade the answers
    const result = await step.run("grade-answers", async () => {
      const submission =
        await Submission.findById(submissionId).populate("examId");
      const exam = submission?.examId as any;

      let score = 0;
      const gradedAnswers = submission!.answers.map((answer) => {
        const question = exam.questions.find(
          (q: any) => q._id.toString() === answer.questionId.toString(),
        );
        const isCorrect = question?.correctAnswer === answer.selectedAnswer;
        if (isCorrect) score++;
        return {
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          isCorrect,
        };
      });

      const totalMarks = exam.questions.length;
      const percentage = Math.round((score / totalMarks) * 100);

      await Submission.findByIdAndUpdate(submissionId, {
        answers: gradedAnswers,
        result: { score, totalMarks, percentage, gradedAt: new Date() },
        status: "graded",
      });

      return { score, totalMarks, percentage };
    });

    // Step 2 — Update student GPA
    await step.run("update-gpa", async () => {
      const submission = await Submission.findById(submissionId);
      const allSubmissions = await Submission.find({
        studentId: submission?.studentId,
        status: "graded",
      });

      const avg =
        allSubmissions.reduce(
          (sum, s) => sum + (s.result?.percentage || 0),
          0,
        ) / allSubmissions.length;

      await Student.findByIdAndUpdate(submission?.studentId, {
        gpa: Math.round(avg * 100) / 100,
      });
    });

    // Step 3 — Send result email
    await step.run("send-result-email", async () => {
      const submission = await Submission.findById(submissionId)
        .populate({
          path: "studentId",
          populate: { path: "userId" },
        })
        .populate("examId");

      const student = submission?.studentId as any;
      const exam = submission?.examId as any;

      await sendEmail({
        email: student.userId.email,
        name: student.userId.name,
        subject: `Your results for ${exam.topic}`,
        resetURL: `${process.env.CLIENT_URL}/results/${submissionId}`,
      });
    });

    return { success: true, result };
  },
);
