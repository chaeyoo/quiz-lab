import { useNavigate } from "react-router-dom";
import { IQuizSet } from "../../types/quiz";

export default function QuizSetList({ quizSets }: { quizSets: IQuizSet[] }) {
	const navigate = useNavigate();
	return (
		<div className="mx-16 my-14">
			<h1 className="text-4xl font-extrabold mb-7">퀴즈랩</h1>
			<div>
				<input
					className="w-full bg-inherit mb-5 p-2 border-b-2 focus:border-b-4 focus:outline-none "
					placeholder="세트 필터링"
				/>
				<div data-testid="quiz-sets">
					{(!quizSets || quizSets.length === 0) && <>비어있음</>}
					{quizSets &&
						quizSets.length > 0 &&
						quizSets.map((set, idx) => (
							<li
								className="list-none mb-3 rounded-lg p-5 border-2 border-gray-400 border-opacity-50"
								key={set.id}
								data-testid="set-list"
								onClick={() => {
									navigate(`/quiz/${set.id}`);
								}}
							>
								<div
									className="text-lg font-semibold mb-2"
									data-testid="set-title"
								>
									{set.name}
								</div>
								<div className="mb-10">
									<span
										className="text-xs bg-slate-500 px-2 py-1 rounded-3xl font-semibold text-white"
										data-testid="set-length"
									>
										{set.length} 단어
									</span>
								</div>
								<div data-testid="set-author">{set.author}</div>
							</li>
						))}
				</div>
			</div>
		</div>
	);
}
