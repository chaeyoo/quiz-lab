import { useParams } from "react-router-dom";
import { Suspense } from "react";

import QuizSetSkeleton from "./skeleton";
import QuizSetInfo from "./info";

export default function QuizSet() {
	const { id } = useParams();
	if (!id) {
		return <>error</>;
	}
	return (
		<div data-testid="quiz-set" className="mx-5 my-14">
			<Suspense fallback={<QuizSetSkeleton />}>
				<QuizSetInfo id={Number(id)} />
			</Suspense>
		</div>
	);
}
