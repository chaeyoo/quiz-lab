export interface IQuizSet {
	id: number;
	name: string;
	length: number;
	author: string;
	createdAt: string;
	quizes: IQuiz[];
}

export interface IQuiz {
	word: string;
	mean: string;
	seq: number;
}
