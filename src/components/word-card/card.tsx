import "./card.css";
import useQuizSet from "../../hooks/useQuizSet";
import { IQuizSet } from "../../types/quiz";
import Quizes from "./quizes";

export default function Card({ id }: { id: number }) {
	const { data } = useQuizSet(id);

	const quizSet: IQuizSet | null = data ? data[0] : null;

	if (data == null || quizSet == null) {
		return <>error</>;
	}
	const quizes = quizSet?.quiz;

	return (
		<div data-testId="main">
			<Quizes id={id} quizes={quizes} />
		</div>
	);
}
