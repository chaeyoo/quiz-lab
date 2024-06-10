import { IQuizSet } from "../../types/quiz";

export default function List({ quizSets }: { quizSets: IQuizSet[] }) {
	if (!quizSets || quizSets.length === 0) {
		return <div>비어있음</div>;
	}
	<div>
		퀴즈
		{quizSets.map((set, idx) => (
			<div
				className="mb-3 rounded-lg p-5 border-2 border-gray-400 border-opacity-50"
				key={set.id}
			>
				<div className="text-lg font-semibold mb-2" data-testid="quiz-title">
					{set.name}
				</div>
				<div className="mb-10">
					<span className="text-xs bg-slate-500 px-2 py-1 rounded-3xl font-semibold text-white">
						{set.length} 단어
					</span>
				</div>
				<div>{set.author}</div>
			</div>
		))}
	</div>;
}
