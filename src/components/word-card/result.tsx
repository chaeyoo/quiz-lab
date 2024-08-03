import { useCardStore } from "../../store/useQuizStore";

export default function CardResult() {
	const quiz = useCardStore((state) => state.quiz);
	return (
		<div>
			{quiz.length === 0 ? (
				<p>No quizzes available</p>
			) : (
				quiz.map((item) => (
					<div
						key={item.seq}
						style={{
							border: "1px solid #ccc",
							margin: "10px",
							padding: "10px",
						}}
					>
						<h3>{item.word}</h3>
						<p>Meaning: {item.meaning}</p>
						<p>Sequence: {item.seq}</p>
						<p>Starred: {item.star ? "Yes" : "No"}</p>
					</div>
				))
			)}
		</div>
	);
}
