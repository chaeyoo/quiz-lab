import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { fetchQuizSets } from "../../api/quiz";

export default function QuizSetList() {
	const [quizSets, setQuizSets] = useState([]);

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
		<div className="mx-16 my-14">
			<h1 className="text-4xl font-extrabold mb-7">퀴즈랩</h1>
			<div>
				<input
					className="w-full bg-inherit mb-5 p-2 border-b-2 focus:border-b-4 focus:outline-none "
					placeholder="세트 필터링"
				/>
			</div>
		</div>
	);
}
