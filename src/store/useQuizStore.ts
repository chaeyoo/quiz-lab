import { create } from "zustand";
import { IQuiz } from "../types/quiz";

interface QuizState {
	quiz: IQuiz[];
	add: (newQuiz: IQuiz) => void;
}

export const useCardStore = create<QuizState>()((set) => ({
	quiz: [],
	add: (newQuiz) =>
		set((state) => ({
			quiz: [...state.quiz, newQuiz],
		})),
}));
