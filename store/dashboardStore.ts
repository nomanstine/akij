import { create } from 'zustand';

interface DashboardStore {
  tests: any[];
  isLoading: boolean;
  setTests: (tests: any[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  tests: [],
  isLoading: true,
  setTests: (tests) => set({ tests }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
