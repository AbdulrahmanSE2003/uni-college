import { getGeminiModel } from "../config/gemini";

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

  const result = await getGeminiModel().generateContent(prompt);
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
    You are an expert school scheduling algorithm. 
    Generate a strictly formatted, collision-free weekly timetable for ${gradeName}.
    
    ### INPUT PARAMETERS
    - School days: ${days.join(", ")}
    - School hours: ${startTime} to ${endTime} (24-hour format)
    - Periods per day: ${periodsPerDay}
    - Total periods in week: ${days.length * periodsPerDay}
    
    Available subjects and teachers:
    ${subjects.length > 0 ? subjects.map((s) => `- ${s.name} (taught by ${s.teacherName})`).join("\n") : "None"}
    
    ### STRICT SCHEDULING RULES
    1. EXACTLY ONCE PER WEEK: Every provided subject MUST be scheduled exactly one time in the entire week. Do not repeat any subject.
    2. FREE SLOTS: The total number of periods in the week (${days.length * periodsPerDay}) is greater than the number of available subjects (${subjects.length}). You MUST fill all remaining empty periods with "Free Slot".
    3. TIME MATH: Calculate the exact duration of each period by dividing the total daily time by the number of periods. Output the exact "startTime" and "endTime" for every period sequentially.
    4. SEQUENTIAL ORDER: Every day must have exactly ${periodsPerDay} periods scheduled back-to-back without any time gaps.
    
    ### OUTPUT FORMAT
    Return ONLY a valid JSON array of objects. NO markdown formatting, NO \`\`\`json blocks, NO explanations.
    Each object must represent a single period and strictly follow this schema:
    {
      "day": string (Must exactly match one of the provided school days),
      "subjectName": string (The subject name OR "Free Slot"),
      "teacherName": string | null (The teacher's name OR null if it is a "Free Slot"),
      "startTime": string (HH:MM format),
      "endTime": string (HH:MM format)
    }
    
    Example format:
    [
      {"day":"SAT","subjectName":"SW Engineering","teacherName":"Dr. Sarah","startTime":"09:00","endTime":"11:00"},
      {"day":"SAT","subjectName":"Free Slot","teacherName":null,"startTime":"11:00","endTime":"13:00"}
    ]
  `;

  const result = await getGeminiModel().generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();

  const slots: TimetableSlot[] = JSON.parse(clean);
  return slots;
};
