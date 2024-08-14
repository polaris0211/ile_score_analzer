import { create } from "zustand";
interface Store {
  average: number;
  setAverage: (average: number) => void;
  topThirtyAverage: number;
  setTopThirtyAverage: (topThirtyAverage: number) => void;
  score: number;
  setScore: (score: number) => void;
}
export const useStore = create<Store>()((set) => ({
  average: 0,
  setAverage: (average: number) => set({ average: average }),
  topThirtyAverage: 0,
  setTopThirtyAverage: (topThirtyAverage: number) =>
    set({ topThirtyAverage: topThirtyAverage }),
  score: 0,
  setScore: (score) => set({ score: score }),
}));
