import { quizSets } from "../../mock/data";

export default function QuizSetMain() {
	return (
		<div className="mx-16 my-14">
			<h1 className="text-4xl font-extrabold mb-7">퀴즈랩</h1>
			<div>
				<input
					className="w-full bg-inherit mb-5 p-2 border-b-2 focus:border-b-4 focus:outline-none "
					placeholder="세트 필터링"
				/>
			</div>
			{quizSets.map((set, idx) => (
				<div
					className="mb-3 rounded-lg p-5 border-2 border-gray-400 border-opacity-50"
					key={idx}
				>
					<div className="text-lg font-semibold mb-2">{set.name}</div>
					<div className="mb-10">
						<span className="text-xs bg-slate-500 px-2 py-1 rounded-3xl font-semibold text-white">
							{set.length} 단어
						</span>
					</div>
					<div>{set.author}</div>
				</div>
			))}
		</div>
	);
}
