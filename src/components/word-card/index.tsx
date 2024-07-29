import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Card from "./card";

export default function QuizWordCard() {
	const { id } = useParams();
	console.log(id);
	if (!id) {
		return <>error</>;
	}
	return (
		<div data-testid="quiz-set" className="my-10">
			<Suspense fallback={"낱말카드 생성중..."}>
				<Card id={Number(id)} />
			</Suspense>
		</div>
	);
}
