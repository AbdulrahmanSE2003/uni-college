import { geminiModel } from "../config/gemini";

interface GenerateExamParams {
  subject: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  numberOfQuestions: number;
}

interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const generateExamQuestions = async ({
  subject,
  topic,
  difficulty,
  numberOfQuestions,
}: GenerateExamParams): Promise<MCQQuestion[]> => {
  const prompt = `
    Generate ${numberOfQuestions} multiple choice questions for a ${difficulty} level exam.
    Subject: ${subject}
    Topic: ${topic}
    
    Return ONLY a valid JSON array with no markdown, no backticks, no explanation.
    Each object must have exactly these fields:
    - "question": string
    - "options": array of exactly 4 strings
    - "correctAnswer": string (must match one of the options exactly)
    
    Example format:
    [{"question":"...","options":["A","B","C","D"],"correctAnswer":"A"}]
  `;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();

  // Strip any accidental markdown backticks
  const clean = text.replace(/```json|```/g, "").trim();

  const questions: MCQQuestion[] = JSON.parse(clean);
  return questions;
};

interface GenerateTimetableParams {
  gradeName: string;
  subjects: { name: string; teacherName: string }[];
  startTime: string; // "08:00"
  endTime: string; // "15:00"
  periodsPerDay: number;
  days: string[]; // ["SAT", "SUN", "MON", "TUE", "WED", "THU"]
}

interface TimetableSlot {
  day: string;
  subjectName: string;
  teacherName: string;
  startTime: string;
  endTime: string;
}

export const generateTimetable = async ({
  gradeName,
  subjects,
  startTime,
  endTime,
  periodsPerDay,
  days,
}: GenerateTimetableParams): Promise<TimetableSlot[]> => {
  const prompt = `
    Generate a collision-free weekly timetable for ${gradeName}.
    School days: ${days.join(", ")}
    School hours: ${startTime} to ${endTime}
    Periods per day: ${periodsPerDay}
    
    Available subjects and their teachers:
    ${subjects.map((s) => `- ${s.name} (taught by ${s.teacherName})`).join("\n")}
    
    Rules:
    - No teacher should appear twice in the same time slot
    - Distribute subjects evenly across the week
    - Each period should be equal duration
    
    Return ONLY a valid JSON array with no markdown, no backticks, no explanation.
    Each object must have exactly these fields:
    - "day": string
    - "subjectName": string
    - "teacherName": string  
    - "startTime": string (HH:MM format)
    - "endTime": string (HH:MM format)
    
    Example format:
    [{"day":"SAT","subjectName":"Math","teacherName":"Mr. Ahmed","startTime":"08:00","endTime":"09:00"}]
  `;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();

  const slots: TimetableSlot[] = JSON.parse(clean);
  return slots;
};
