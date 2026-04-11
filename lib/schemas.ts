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
  name: z.string().min(1, "Test name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  duration: z.number().min(1, "Duration must be greater than 0"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  totalQuestions: z.number().min(1, "Total questions must be greater than 0"),
});

export type TestBasicInfo = z.infer<typeof TestBasicInfoSchema>;
