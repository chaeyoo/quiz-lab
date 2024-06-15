export interface Quiz {
	word: string;
	mean: string;
	seq: number;
}
export interface IQuizSet {
	id: number;
	name: string;
	length: number;
	author: string;
	createdAt: string;
	quizes?: Quiz[];
}
