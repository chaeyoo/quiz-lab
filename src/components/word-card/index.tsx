import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Card from "./card";
import CardSkeleton from "./skeleton";

export default function QuizWordCard() {
	const { id } = useParams();
	if (!id) {
		return <>error</>;
	}
	return (
		<div data-testid="word-card" className="my-10">
			<Suspense fallback={<CardSkeleton />}>
				<Card id={Number(id)} />
			</Suspense>
		</div>
	);
}
