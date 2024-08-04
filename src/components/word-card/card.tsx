import "./card.css";
import useQuizSet from "../../hooks/useQuizSet";
import { IQuizSet } from "../../types/quiz";
import Quizes from "./quizes";

export default function Card({ id }: { id: number }) {
	const { data } = useQuizSet(id);

	const quizSet: IQuizSet = data![0];
	const quizes = quizSet?.quiz;

	if (data == null) {
		return null;
	}

	return <Quizes id={id} quizes={quizes} />;
}
