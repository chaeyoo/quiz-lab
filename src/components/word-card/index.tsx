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
		<div data-testid="word-card" className="pt-5">
			<Suspense fallback={<CardSkeleton />}>
				<Card id={Number(id)} />
			</Suspense>
		</div>
	);
}
