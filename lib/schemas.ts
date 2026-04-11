import { z } from "zod";

export const QuestionOptionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean().optional(),
});

export const QuestionTypeSchema = z.enum(["mcq", "text", "checkbox", "radio", "multiple-choice", "rich-text"]);

export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Question text is required"),
  type: QuestionTypeSchema,
  points: z.number().optional(),
  options: z.array(QuestionOptionSchema).optional(),
  correctAnswer: z.string().optional(),
});

export type QuestionOption = z.infer<typeof QuestionOptionSchema>;
export type QuestionType = z.infer<typeof QuestionTypeSchema>;
export type Question = z.infer<typeof QuestionSchema>;

export const TestBasicInfoSchema = z.object({
  title: z.string().min(1, "Test title is required"),
  duration: z.string().min(1, "Duration is required"),
  questionCount: z.number().min(1, "Question count must be greater than 0"),
  negativeMarking: z.string().min(1, "Negative marking is required"),
  candidates: z.string().min(1, "Candidates is required"),
  questionSets: z.string().min(1, "Question sets is required"),
  examSlots: z.string().min(1, "Exam slots is required"),
  questionTypes: z.array(z.string()).min(1, "At least one question type is required"),
});

export type TestBasicInfo = z.infer<typeof TestBasicInfoSchema>;
