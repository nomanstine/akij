import { create } from 'zustand';

interface TestData {
  id: number;
  title: string;
  candidates: string;
  questionSets: string;
  examSlots: string;
}

interface TestListStore {
  testData: TestData[];
  isLoading: boolean;
  setTestData: (data: TestData[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useTestListStore = create<TestListStore>((set) => ({
  testData: [],
  isLoading: true,
  setTestData: (testData) => set({ testData }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
