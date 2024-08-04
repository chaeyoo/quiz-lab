import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Exam from "./exam";

export default function QuizExam() {
	const { id } = useParams();
	if (!id) {
		return <>error</>;
	}
	return (
		<div data-testid="word-card" className="my-10">
			<Suspense fallback={<>시험준비중...</>}>
				<Exam id={Number(id)} />
			</Suspense>
		</div>
	);
}
