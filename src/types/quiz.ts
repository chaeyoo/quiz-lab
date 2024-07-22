export interface IQuizSet {
	id: number;
	name: string;
	user: IUser;
	created_at: string;
	modified_at: string;
	quiz?: IQuiz[];
}

export interface IUser {
	nick_name: string;
}

export interface IQuiz {
	word: string;
	meaning: string;
	seq: number;
	star: boolean;
}
