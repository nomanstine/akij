import { create } from 'zustand';
import { Question, TestBasicInfo } from '@/lib/schemas';

interface TestStore {
  currentStep: 'basic' | 'questions';
  basicInfo: Partial<TestBasicInfo>;
  questions: Question[];
  isEditMode: boolean;
  editTestId: number | null;
  setCurrentStep: (step: 'basic' | 'questions') => void;
  setBasicInfo: (info: Partial<TestBasicInfo>) => void;
  setQuestions: (questions: Question[]) => void;
  setIsEditMode: (isEdit: boolean) => void;
  setEditTestId: (id: number | null) => void;
  reset: () => void;
}

export const useTestStore = create<TestStore>((set) => ({
  currentStep: 'basic',
  basicInfo: {},
  questions: [],
  isEditMode: false,
  editTestId: null,
  setCurrentStep: (step) => set({ currentStep: step }),
  setBasicInfo: (info) => set((state) => ({ basicInfo: { ...state.basicInfo, ...info } })),
  setQuestions: (questions) => set({ questions }),
  setIsEditMode: (isEdit) => set({ isEditMode: isEdit }),
  setEditTestId: (id) => set({ editTestId: id }),
  reset: () => set({ currentStep: 'basic', basicInfo: {}, questions: [], isEditMode: false, editTestId: null }),
}));
