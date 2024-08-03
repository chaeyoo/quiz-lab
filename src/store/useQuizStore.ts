import { create } from "zustand";
import { IQuiz } from "../types/quiz";

interface QuizState {
	quiz: IQuiz[];
	known: number;
	ing: number;
	add: (newQuiz: IQuiz) => void;
	upKnown: () => void;
	upIng: () => void;
}

export const useCardStore = create<QuizState>()((set) => ({
	quiz: [],
	known: 0,
	ing: 0,
	add: (newQuiz) =>
		set((state) => ({
			quiz: [...state.quiz, newQuiz],
		})),
	upKnown: () =>
		set((state) => ({
			known: state.known + 1,
		})),
	upIng: () =>
		set((state) => ({
			ing: state.ing + 1,
		})),
}));
