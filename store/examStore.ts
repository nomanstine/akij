import { create } from 'zustand';
import { Question } from '@/lib/schemas';

interface Answer {
  questionId: string;
  optionId?: string;
  text?: string;
}

interface ExamStore {
  selectedTest: any;
  examQuestions: Question[];
  isLoading: boolean;
  currentQuestionIndex: number;
  answers: Answer[];
  timeLeft: number;
  currentSelectedOption: string | null;
  showTimeoutModal: boolean;
  setSelectedTest: (test: any) => void;
  setExamQuestions: (questions: Question[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentQuestionIndex: (indexOrFn: number | ((prev: number) => number)) => void;
  setAnswers: (answersOrFn: Answer[] | ((prev: Answer[]) => Answer[])) => void;
  setTimeLeft: (timeOrFn: number | ((prev: number) => number)) => void;
  setCurrentSelectedOption: (option: string | null) => void;
  setShowTimeoutModal: (show: boolean) => void;
  resetExam: () => void;
}

export const useExamStore = create<ExamStore>((set) => ({
  selectedTest: null,
  examQuestions: [],
  isLoading: true,
  currentQuestionIndex: 0,
  answers: [],
  timeLeft: 0,
  currentSelectedOption: null,
  showTimeoutModal: false,
  setSelectedTest: (test) => set({ selectedTest: test }),
  setExamQuestions: (questions) => set({ examQuestions: questions }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setCurrentQuestionIndex: (indexOrFn) => set((state) => ({ currentQuestionIndex: typeof indexOrFn === 'function' ? indexOrFn(state.currentQuestionIndex) : indexOrFn })),
  setAnswers: (answersOrFn) => set((state) => ({ answers: typeof answersOrFn === 'function' ? answersOrFn(state.answers) : answersOrFn })),
  setTimeLeft: (timeOrFn) => set((state) => ({ timeLeft: typeof timeOrFn === 'function' ? timeOrFn(state.timeLeft) : timeOrFn })),
  setCurrentSelectedOption: (option) => set({ currentSelectedOption: option }),
  setShowTimeoutModal: (show) => set({ showTimeoutModal: show }),
  resetExam: () => set({
    selectedTest: null,
    examQuestions: [],
    isLoading: true,
    currentQuestionIndex: 0,
    answers: [],
    timeLeft: 0,
    currentSelectedOption: null,
    showTimeoutModal: false,
  }),
}));
