import { quizSets } from "../../mock/data";
import List from "./list";

export default function QuizSetList() {
	return (
		<div className="mx-16 my-14">
			<h1 className="text-4xl font-extrabold mb-7">퀴즈랩</h1>
			<div>
				<List quizSets={quizSets} />
				<input
					className="w-full bg-inherit mb-5 p-2 border-b-2 focus:border-b-4 focus:outline-none "
					placeholder="세트 필터링"
				/>
			</div>
		</div>
	);
}
