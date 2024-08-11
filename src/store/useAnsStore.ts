import { create } from "zustand";
import { IQuiz } from "../types/quiz";

interface AnsState {
	oQuiz: IQuiz[];
	xQuiz: IQuiz[];
	correct: (quiz: IQuiz) => void;
	wrong: (quiz: IQuiz) => void;
	clearQuiz: () => void;
}

export const useAnsStore = create<AnsState>()((set) => ({
	oQuiz: [],
	xQuiz: [],
	correct: (quiz) =>
		set((state) => ({
			oQuiz: [...state.oQuiz, quiz],
		})),
	wrong: (quiz) =>
		set((state) => ({
			xQuiz: [...state.xQuiz, quiz],
		})),
	clearQuiz: () => set({ oQuiz: [], xQuiz: [] }),
}));
