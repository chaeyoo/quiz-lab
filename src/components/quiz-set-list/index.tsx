import { Suspense, useEffect, useState } from "react";
import { fetchQuizSets } from "../../api/quiz";
import { IQuizSet } from "../../types/quiz";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { convertStr } from "../../lib/convertStr";
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL!, REACT_APP_SUPABASE_ANON_KEY!);
export default function QuizSetList() {
	const [quizSets, setQuizSets] = useState<IQuizSet[] | []>([]);
	const navigate = useNavigate();
	useEffect(() => {
		async function getQuizSets() {
			const { data, error } = await supabase
				.from("quiz_set")
				.select(
					`
				id,
				name,
				user (nick_name),
				quiz ( id, word, meaning, star)
			  `
				)
				.eq("id", 1);
			console.log(data, '단건');
		}
		getQuizSets();
	}, []);

	useEffect(() => {
		console.log(quizSets);
	}, [quizSets]);

	useEffect(() => {
		async function getQuizSets() {
			try {
				const data = await fetchQuizSets();
				setQuizSets(data);
			} catch (error) {
				console.error("Error in QuizSetList:", error);
			}
		}

		getQuizSets();
	}, []);

	useEffect(() => {
		console.log(quizSets);
	}, [quizSets]);

	return (
		<div className="mx-5 my-14 min-w-[300px]">
			<h1 className="text-4xl font-extrabold mb-7">퀴즈랩</h1>
			<div>
				<input
					className="w-full bg-inherit mb-5 p-2 border-b-2 focus:border-b-4 focus:outline-none "
					placeholder="세트 필터링"
					onChange={async (e) => {
						const data = await fetchQuizSets(convertStr(e.target.value));
						setQuizSets(data);
					}}
				/>
			</div>

			<div>
				{quizSets.length > 0 &&
					quizSets.map((quizSet, idx) => (
						<div
							key={idx}
							className="border-gray-700 border-2  rounded-2xl p-4 mb-4"
							onClick={() => {
								navigate(`/${quizSet.id}`);
							}}
						>
							<div className="mb-1 font-semibold">{quizSet.name}</div>
							<div className="text-xs mb-3">
								{quizSet.quiz ? quizSet.quiz.length : 0} 단어
							</div>
							<div className="text-xs">{quizSet.user.nick_name}</div>
						</div>
					))}
			</div>
		</div>
	);
}
