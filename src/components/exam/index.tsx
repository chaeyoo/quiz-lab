import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Exam from "./exam";
import ExamSkeleton from "./skeleton";

export default function QuizExam() {
	const { id } = useParams();
	if (!id) {
		return <>error</>;
	}
	return (
		<div data-testid="word-exam" className="pt-5">
			<Suspense fallback={<ExamSkeleton />}>
				<Exam id={Number(id)} />
			</Suspense>
		</div>
	);
}
